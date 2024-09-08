"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = require("yargs");
function main() {
    var argv = (0, yargs_1.default)(process.argv.slice(2)).argv;
    console.log(argv);
}
