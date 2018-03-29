const moongoos = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = moongoos.Schema;

var authUserSchema = new Schema({
    name: String,
    email: {type: String, require: true, index:{unique: true}},
    password: {type: String, require: true, select: false},
    createdDate: {type: Date, default: Date.now}
});

// create new user authentication
authUserSchema.pre("save", function(next){
    var user = this;
    if (!user.isModified('password') || user.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

authUserSchema.methods.comparePassword = function(password){
    var user = this;
    console.log("compare psw::" + user)
    return bcrypt.compareSync(password, user.password);
};
module.exports = moongoos.model('authUser', authUserSchema);