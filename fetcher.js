const request = require('request');
const fs = require('fs');

const stdin = process.stdin;
const args = process.argv;
const URL = args[2];
const PATH = args[3];

if (fs.existsSync(PATH)) {
  console.log("File already exists!")
  process.exit();
  //ask if they want to overwrite
  // stdin.on('data', (answer) => {
  //   if (answer.toUpperCase === "Y") {
  //     //we need to ask for a new file path
  //     console.log("Please enter new path: \n")
  //     stdin.on('data', (newPath) => {
  //       PATH = newPath;
  //     })
} 
request(URL, (error, response, body) => {
  if (response.statusCode != 200) { 
    console.log(`Error: ${response.statusCode}, URL Results in an Error`)
    process.exit()
  }
  fs.writeFile(PATH, body, () => {
    if (error) throw error;
    
    const bytes = fs.statSync(PATH).size;
    console.log(`Downloaded and saved ${bytes} bytes to ${PATH}`);
  })
});

