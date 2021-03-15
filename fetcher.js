//import request library;
const request = require("request");
//import node.js fs module
const fs = require("fs");
//initialize function;

const fetcher = (url, folder) => {
  //Argunments: url, local folder to download contents to;
  url = url.trim(); //remove whitespace that surrounds variables;
  folder = folder.trim(); //remove whitespace that surrounds variables;
  //source for regular expression to validate url: https://www.geeksforgeeks.org/how-to-validate-url-using-regular-expression-in-javascript/
  const regex = new RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );
  if (!url.match(regex)) {
    console.log("Error: URL is invalid");
    return false;
    //if the given URL results in an error or non-200 result, terminate the app explaining to the user what went wrong, and not write the response body to the file
  }
  //use the request library to make an http request to the url variable;
  request(url, (error, response, data) => {
    //use the callback based approach to take in the url's data when it is recieved and write it to the folder specified;
      
    error  ?  console.log("error:", error)
    //use Node's fs module to write the file;
    //if the local file path given already exists, overwrite local file
    //do not use the pipe function;
    //do not use writeFileSync function or other synchronous functions;
      : fs.writeFile(folder, data, err => err
        ? console.log("error:", err) /* Print the error if one occurred*/
        : //on completion, callback console.log with amount downloaded and the folder it was saved to;
        console.log(
          `Downloaded and saved ${data.bytesWritten} bytes to ${folder}`
        )
      );
    //if the given URL results in an error or non-200 result, terminate the app explaining to the user what went wrong, and not write the response body to the file
  });
};
//read the 2 values from the process.argv array and use them as variables;
fetcher(process.argv[2], process.argv[3]);
