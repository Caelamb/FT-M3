const { argv0 } = require('process');
const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

const print = (output) => {
   process.stdout.write(output);
   process.stdout.write("\nprompt > ");
}

function bash() {
   process.stdout.write("prompt > ");
   process.stdin.on("data", data => {
      const args = data.toString().trim();;
      const cmd = args.split(' ')[0];
      if(!commands[cmd])
      print(`command not found: ${cmd}`)
   
   })
}



bash();
module.exports = {
   print,
   bash,
};