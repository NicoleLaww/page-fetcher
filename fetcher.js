const request = require("request");
const fs = require("fs");

const domain = process.argv[2];
const path = process.argv[3];

const fetch = (domain, path) => {
  request(domain, (error, response, body) => {
    // console.log("error:", error);
    // console.log("statusCode:", response && response.statusCode);
    // console.log("body:", body);
    if (error || (response.statusCode !== 200)) {
      console.log(error, response.statusCode);
      return;
    }
    fs.writeFile(path, body, error => {
      if (error) {
        console.log("Failed to write to local path..", path);
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
      }
    });
  });
};

if (!domain || !path) {
  console.log("Please add domain and path.");
} else {
  fetch(domain, path);
}



