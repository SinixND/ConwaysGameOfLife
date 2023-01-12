/*
function f_return(arg) {
    //do something like displaying
};

let myPromise = new Promise(function(myResolve, myReject) {
    
    // "Producing Code" (May take some time)

    myResolve(console.log("promise: resolve")); // when successful
    myReject(console.log("promise: reject"));  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
    function(value) {console.log(value)},
    function(error) {console.log(error)}
);
*/

function csvParser(filename) {// incl. *.filetyp
    //return new Promise((resolve, reject) => {

    //})
    // initialize
    const fs = require("fs");
    const readline = require("readline");

    const rfs = fs.createReadStream(`./csv/${filename}`);
    const reader = readline.createInterface({ input: rfs });

    let arr = [];
    reader.on("line", row => {
        // split row string in array and push
        arr.push(row.split(","));
        console.log("1: pushed: " + row.split(","));
    });

    reader.on("close", () => {
        console.log("2: onClose: ");
        console.log(arr);
    });
    console.log("return arr: " + arr);

    return arr;
};

let parsedCSV = csvParser('data.csv');
console.log("finalarr: " + parsedCSV);
