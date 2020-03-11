const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const args = process.argv;
const URL = args[2];
let PATH = args[3];

// stdin.setRawMode(true);
// stdin.setEncoding('utf8');

const requestAndWrite = () => {
  request(URL, (error, response, body) => {
    if (response.statusCode != 200) { 
      console.log(`Error: ${response.statusCode}, URL Results in an Error`)
      process.exit()
    }
    fs.writeFile(PATH, body, () => {
      if (error) throw error;
      
      const bytes = fs.statSync(PATH).size;
      console.log(`Downloaded and saved ${bytes} bytes to ${PATH}`);
      process.exit()
    })
  });
}  

if (fs.existsSync(PATH)) {
  console.log(`File already exists at path: ${PATH}`)
  //ask if they want to overwrite or give new path
  rl.question('Would you like to enter a different path (Y / N) or overwrite this file (O)?\n', (answer) => {
    if (answer.toUpperCase() === "Y") {
      rl.question('Please enter new path: ', (newPath) => {
        PATH = newPath;
        requestAndWrite();
      }) 
    } else if (answer.toUpperCase() === "N") {
      process.exit();
    } else if (answer.toUpperCase() === "O") {
      requestAndWrite();
    }
  })
} else {
  requestAndWrite();
}