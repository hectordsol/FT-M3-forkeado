//comandos bash
let fs = require("fs");
//let request = require("request");

// console.log(fs)

module.exports = {
  pwd: (cb) => {
    cb(process.env.PWD);
  }, // process.cwd()
  date: (cb) => {
    cb(Date());
  },
  ls: (cb) => {
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      cb(files.join("\n"));
    });
  },
  echo: (cb, text) => {
    cb(text.join(""));
  },
  cat: (cb, text) => {
    fs.readFile(text[0], "utf-8", (err, data) => {
      cb(data);
    });
  },
  select: (cb, text) => {
    fs.readFile(text[0], "utf-8", (err, data) => {
      cb(data.split("\n").splice(text[1], text[2]).join("\n"));
    });
  },
  head: (cb, text) => {
    fs.readFile(text[0], "utf-8", (err, data) => {
      cb(data.split("\n").splice(0, text[1]).join("\n"));
    }); // splice modifica el array original
  },
  tail: (cb, text) => {
    fs.readFile(text[0], "utf-8", (err, data) => {
      cb(data.split("\n").slice(-text[1]).join("\n"));
    }); // slice no modifica tu array y te retorna uno nuevo
  },
  curl: (cb, text) => {
    request(text[0], (error, data) => {
      cb(data.body);
    });
  },
};