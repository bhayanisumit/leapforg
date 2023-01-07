let bcrypt = require('bcrypt');
 
exports.cryptPassword = async(myPlaintextPassword) =>{
    return await bcrypt.hash(myPlaintextPassword, 10)
}


 exports.comparePassword = async(plainPass,hash)  => {
    return await  bcrypt.compare(plainPass, hash)
 };