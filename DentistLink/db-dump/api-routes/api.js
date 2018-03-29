var authUser = require("../models/user-auth-table");
var config = require("../../bin/config");

var secretKey = config.secretKey;

var jsonwebtoken = require('jsonwebtoken');

module.exports = function(app, express){
    var api = express.Router();

    // save data in mongoose for new users.
    api.post('/signup', function(req, res){
        var user = new authUser({
            name: req.body.name,
            email: req.body.emailId,
            password: req.body.password,
            createdDate: new Date()
        });                
        user.save(function(err){
            if(err){
                console.log(err)
                res.send(err);
                return;
            }
            res.json({message: 'User has been created!'});
        });
    });

    return api;
};