const path = require('path');
const fs = require('fs');
const filePath = path.resolve(__dirname, './markov.txt');

var lineReader = require('readline').createInterface({
   input: fs.createReadStream(filePath)
});

const fixedLines = [];

lineReader
   .on('line', function (line) {
      var str = line.toString().trim();
      if (str.length < 100 && str !== '' && fixedLines.indexOf(str) === -1 && str[0] !== '!') {
         fixedLines.push(str);
      }
   })
   .on('close', function() {
      fs.writeFileSync(filePath, fixedLines.join('\n'));
   });
