const fs = require("fs");

const a = fs.readFileSync("./result.txt", "utf8");
console.log(a);
