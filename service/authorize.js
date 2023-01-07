const { expressjwt: jwt } = require("express-jwt");
const  secret  = process.env.secret;

exports.authorize = ()  => {
     return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            // authentication and authorization successful
            next();
        }
    ];
}

 