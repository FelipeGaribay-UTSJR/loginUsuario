var admin=require("firebase-admin");
var keys=require("../miproyecto-76dbf-firebase-adminsdk-3p4gt-9092484d58.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var micuenta=admin.firestore();
var conexionUsuarios=micuenta.collection("ejemplo1");
var conexionProductos=micuenta.collection("productos");



module.exports={
    conexionUsuarios,
    conexionProductos
}