const mongoose = require('mongoose');
const { Schema } = mongoose;


const user = mongoose.Schema({
    firstName : {type : String , default : ''},
    lastName : {type : String , default : ''},
    email : {type : String , default : '' },
    password : {type : String , default : ''},
    deviceType : {type : String , default : ''},
    deviceId :  {type : String , default : ''},
    deviceToken : {type : String , default : ''},
    status : { type: String, default: 'Active' }, // Active- Unblock // Inactive - block
    createdDate :  { type: Date, default: Date.now },
    updateDate :  { type: Date, default: Date.now }
});

module.exports = mongoose.model('user', user);