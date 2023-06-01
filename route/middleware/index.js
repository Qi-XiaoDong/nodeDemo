const response = require("./response");
const myResHandler = response();

const error = require("./error");
const myErrorHandler = error();
module.exports = [myErrorHandler, myResHandler];
