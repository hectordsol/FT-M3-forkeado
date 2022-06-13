'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor){
    if (typeof executor !== 'function') {
        throw new TypeError('El executor no es "function"');
    }
    this._state = 'pending';
    this._value = undefined;

    this._handlerGroups = [  ];

     executor(this._internalResolve.bind(this), this._internalReject.bind(this));
    // executor(
    //     (data) => this._internalResolve(data), 
    //     (data) => this._internalReject(data)
    //     );
}
$Promise.prototype.then = function(successCb, errorCb ){

    let downstreamPromise = new $Promise(function() {})

    if (typeof successCb != 'function') { successCb= false;}
    if (typeof errorCb != 'function') {errorCb =false;}
    let newHandlerGroup = { 
        successCb: successCb, 
        errorCb: errorCb,
        downstreamPromise: downstreamPromise
    };
    this._handlerGroups.push(newHandlerGroup);
    if (this._state != 'pending') {
        this._callHandler();
    }
    return  downstreamPromise;
}
$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
}
$Promise.prototype._callHandler = function(){
    while (this._handlerGroups.length >0){
        let handlerGroup = this._handlerGroups.shift();
        let downstreamPromise = handlerGroup.downstreamPromise;
        if (this._state === 'fulfilled') {
            if (!handlerGroup.successCb) {
                downstreamPromise._internalResolve(this._value);
            } else {
                try {
                    let resultOk = handlerGroup.successCb(this._value);
                    if (resultOk instanceof $Promise) {
                        resultOk.then(
                            (data) => {downstreamPromise._internalResolve(data)},
                            (error) =>{downstreamPromise._internalReject(error)}
                        );
                    } else {
                        downstreamPromise._internalResolve(resultOk);
                    }
                } catch (error) {
                    downstreamPromise._internalReject(error);
                }
            }
        } 
        else if (this._state === 'rejected'){
            if (!handlerGroup.errorCb) {
                downstreamPromise._internalReject(this._value);
            } else{
                try {
                    let resultError = handlerGroup.errorCb(this._value);
                    if (resultError instanceof $Promise) {
                        resultError.then(
                            (data) => downstreamPromise._internalResolve(data),
                            (error) => downstreamPromise._internalReject(error)
                        );
                    } else {
                        downstreamPromise._internalResolve(resultError);
                    }
                } catch (error) {
                    downstreamPromise._internalReject(error);
                }
            }
        }
    }
}
$Promise.prototype._internalResolve = function(value){
    if (this._state === 'pending') {
        this._value = value;
        this._state = 'fulfilled';
        this._callHandler();
    }
}
$Promise.prototype._internalReject = function (data){
    if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = data;
        this._callHandler();
    }
}
$Promise.resolve = function(value){
    if (value instanceof $Promise) {
        return value;
    }
    else {
        return new $Promise(function(resolveCb,rejectCb){resolveCb(value);},
        (value)=>{rejectCb(value);}
        );
    }
}

$Promise.all = function(arg){
    let promises = [];
    if(!Array.isArray(arg))
        throw new TypeError('debe ser un array');
    else {
        arg.map((value)=>{promises.push($Promise.resolve(value));});
    }
    return new $Promise(function(res, rej){
        let result = [];
        let counter = 0;
        promises.map((promise)=>{
            promise.then((data)=>{
                result.push(data);
                counter++;
                if (counter === promises.length) {
                    res(result);
                }
            }, (error)=>{
                rej(error);
            }
            );
        }
        );          
    }  );
}
$Promise.reject = function(error){
    return new $Promise(function(resolve, reject){
        reject(error);
    }
    );
}


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
function noop () {}
/*
var promise = new $Promise(noop);
if (typeof $Promise.resolve === 'function') {
    console.log('¡Felicidades! ¡Puedes probar tu código!');
}
if ($Promise.resolve !== promise._internalResolve) {
    console.log(' no es promise._internalResolve  ');
}

[42, 'hi', {}, undefined, /cool/, false].forEach(value => {
    var promise = $Promise.resolve(value);
    if ( promise instanceof $Promise )
    console.log( "Promesa " +promise._value+ " es true" );
    // No setea el estado y valor manualmente; llama un resolver.
      if ( promise._state === 'fulfilled' )
           console.log( "Promesa " +promise._value+ " estado es fulfilled" );
      if ( promise._value === value )
        console.log( "Promesa " +promise._value+ " tiene el mismo valor "+value );
}
);

var firstPromise = new $Promise(noop);
var secondPromise = $Promise.resolve(firstPromise);
if (secondPromise === firstPromise) {
    console.log('toma una <promesa para A> y devuelve la misma <promesa para A>');
}

var rejectedPromise = new $Promise(function (resolve, reject) {
    reject();
  });
  var result = $Promise.resolve(rejectedPromise); // RESOLVIENDO...
  if (result._state === 'rejected') {// ...pero RECHAZADA!
    console.log('demuestra porque "resolved" y "fulfilled" no son sinónimos');
  }

if (typeof $Promise.all === 'function') {
    console.log(' $Promise.all es una función');
}
*/
var SMALL_DELAY = 10;
var MAX_DELAY = 100;
var values;
values = [42, 'hi', false, {}, undefined, [] ];
function slowPromise (value, delay) {
    return new $Promise(function (resolve) {
      setTimeout(
        () => resolve(value),
        delay || (Math.random() * MAX_DELAY)
      );
    });
  }
  var promises = values.map((value, i) => {
    var delay = (i + 1) * SMALL_DELAY;
    console.log(value,+ ' ' +delay);
    return slowPromise(value, delay);
  });
  var promise = $Promise.all(promises);
//   promise.then(values => {
//     console.log('1>'+values);
//   }, reason => {
//     console.log('2>'+reason)
//   });
