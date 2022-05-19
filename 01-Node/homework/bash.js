let write = (str)=> {
  process.stdout.write(str)
  process.stdout.write("\nprompt > ")
  }
  
  const commands = require('./commands/index.js')
  // Output un prompt
  process.stdout.write("prompt > ");
  // El evento stdin 'data' se dispara cuando el user escribe una línea
  process.stdin.on("data", function (data) {
    var text = data.toString().trim().split(' '); // remueve la nueva línea
    var cmd = text.shift();
    if(commands.hasOwnProperty(cmd)){
        commands[cmd](write,text)
    } else { write('COMAND ERROR NOT FOUND');}
  });