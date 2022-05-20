'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise (executor){
    
    if(typeof executor !== 'function'){
      throw TypeError('El executor no es una function');
    }
    
    this._value= undefined;
    this._state='pending';
    this._handlerGroups=[];

    executor((nexo)=>{this._internalResolve(nexo)},(error)=>{this._internalReject(error)})
};


$Promise.prototype._internalResolve= function (nexo){
    if(this._state==='pending'){
        this._state='fulfilled';
        this._value= nexo;
        this._callHandlers();
    }          
};


$Promise.prototype._internalReject= function (error){
    if(this._state==='pending'){
        this._state='rejected';
        this._value=error;
        this._callHandlers();
    }
};


$Promise.prototype.then = function (successCb, errorCb) {
    if (typeof successCb != "function") {
      successCb = false;
    }
    if (typeof errorCb != "function") {
      errorCb = false;
    }
    const downstreamPromise = new $Promise (
        function(){
           // if (instanceof $Promise=== 'true'){}   
        }
    );
    this._handlerGroups.push({
      successCb,
      errorCb,
      downstreamPromise,
    });

    if (this._state != "pending") {
      this._callHandlers();
    }
    return downstreamPromise;
};


$Promise.prototype._callHandlers = function(){
    while (this._handlerGroups.length) {
      let { successCb, errorCb, downstreamPromise} = this._handlerGroups.shift();
      if (this._state === "fulfilled") {
        if (!successCb){
            //pB=pA.then(null,eH)
            downstreamPromise._internalResolve(this._value);
        } 
        else{
            try{
                const result=successCb(this._value);
                // result = promiseZ
                if(result instanceof $Promise){
                    result
                    .then(
                        value=> downstreamPromise._internalResolve(value), 
                        err=> downstreamPromise._internalReject(err)
                        );
                }
                else{
                    downstreamPromise._internalResolve(result);
                }
                
            }
            catch(e){
                downstreamPromise._internalReject(e);
            }
        }
        //successCb && successCb(this._value);
      } else if(this._state==='rejected'){
        // errorCb && errorCb(this._value);
        if(!errorCb){
            downstreamPromise._internalReject(this._value);
        }
        else{
            try{
                const result = errorCb(this._value);
                if(result instanceof $Promise){
                    result
                    .then(
                        value=>downstreamPromise._internalResolve(value),
                        err=>downstreamPromise._internalReject(err)
                    );
                }
                else{
                    downstreamPromise._internalResolve(result);
                }
            }
            catch(e){
                downstreamPromise._internalReject(e)
            }
        }
      }
    }
};


$Promise.prototype.catch = function (errorCb) {
    return this.then(null, errorCb);
};
  

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
