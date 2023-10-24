var crypto = require("crypto");

function generarPassword(password){
    var salt=crypto.randomBytes(32).toString("hex");
    var hash = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString("hex");
    return {
        salt,
        hash
    }
}


function validarPassword(password, salt, hash){
    var hashNuevo = crypto.scryptSync(password, salt, 100000, 64, 'sha512').toString("hex");
    return hashNuevo == hash;
}

var {salt, hash}= generarPassword("Hola");


module.exports={
    generarPassword,
    validarPassword
}