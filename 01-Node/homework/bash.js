// console.log(Object.keys(process));
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el usuario escribe una línea
// process.stdin.on('data', function (dato) {
  //   var cmd = dato.toString().trim(); // remueve la nueva línea
  //   process.stdout.write('Escribiste: ' + cmd);
  //   process.stdout.write('\nprompt > ');
  // });
  
// Salida de un prompt
const commands = require("./commands");

function write(data) {
  process.stdout.write(data);
}

function done() {
  process.stdout.write("\nprompt > ");
}

process.stdout.write("prompt > ");

process.stdin.on("data", function (data) {
  var [cmd, ...args] = data.toString().trim().split(" "); // remueve la nueva línea
  if (commands.hasOwnProperty(cmd)) {
    commands[cmd](args, write, done);
  } else {
    process.stdout.write(`Command ${cmd} not found 🤪`);
    process.stdout.write("\nprompt > ");
  }
});