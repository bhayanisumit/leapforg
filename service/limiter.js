const rateLimit = require("express-rate-limit");

exports.limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 min
    max: 100, // limit each IP to 100 requests per windowMs
    message: "We dont accept to many request. Try after sometime"
  });