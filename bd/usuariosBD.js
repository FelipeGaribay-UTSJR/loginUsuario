var conexion = require("./conexion").conexionUsuarios;
const bcrypt = require('bcrypt');
var Usuario = require("../modelos/Usuario");
var {generarPassword}=require("../middlewares/password");

async function mostrarUsuarios(){
    var users=[];
 try{
    var usuarios= await conexion.get();
    usuarios.forEach(usuario =>{
     //console.log(usuario.data());
     var usuario1=new Usuario(usuario.id,usuario.data())
     //console.log("fghgfh");
     //console.log(usuario1);
     if (usuario1.bandera==0){
         users.push(usuario1.obtenerUsuario);
     }
    })
 }
 catch(err){
    console.log("Error al recuperar usuarios mostrar usuarios"+err); 
 }

 return users;

}
async function nuevoUsuario(newUser){
    var { salt, hash } = generarPassword(newUser.password); // Cambiado de datos.password a newUser.password
    newUser.salt = salt;
    newUser.password = hash;
    var error = 0;
    try {
        var usuario1 = new Usuario(null, newUser);
        console.log("Datos recibidos:", usuario1);
        if (usuario1.bandera == 0) {
            conexion.doc().set(usuario1.obtenerUsuario);
            error = 0;
        } else {
            console.log("datos incorrectos");
        }
    } catch (err) {
        console.log("error al crear usuario" + err);
    }
    return error;
}

async function loginUsuario(datos) {
    var error = 1;
    var users = await mostrarUsuarios();
    
    var encontradoUsuario = false;
    var encontradoPassword = false;
    
    var usuario = users.find(dato => dato.usuario === datos.usuario)
    var password = users.find(dato => dato.password === datos.password)

    console.log(usuario);
    console.log(password);

    if (usuario) {
        encontradoUsuario = true;
        if(password) {
            encontradoPassword = true;
        }
    }

    if (encontradoUsuario && encontradoPassword) {
        return error = 0;
    }

    return error;

}


 async function buscarPorId(id){
    var user;
    try{
        var usuarioBD=await conexion.doc(id).get();
        var usuarioObjeto=new Usuario(usuarioBD.id, usuarioBD.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerUsuario;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario "+err);
    }
    return  user;
 } 

 async function modificarUsuario(datos){
    var error=1;
    var user=await buscarPorId(datos.id);
    if(user!=undefined){
    if (datos.password=""){
        datos.password=datos.passwordAnterior;
    }
    else{
        var {salt, hash}=generarPassword(datos.password);
        datos.salt=salt;
        datos.password=hash;
    }
    var user=new Usuario(datos.id, datos);
        if(user.bandera==0){
            try{
                await conexion.doc(user.id).set(user.obtenerUsuario);
                console.log("Los datos se modificaron correctamente");
                error=0;
            }
            catch(err){
                console.log("Error al modificar al usuario"+err);
                    
            }
        }else{
            console.log("Error los datos no son vlaidos");
        }
    }
        return error;
}

 async function borrarUsuario(id){
    var error=1;
    var user=await buscarPorId(id);
    if(user!=undefined){
        try{
            await conexion.doc(id).delete();
            console.log("Registro borrado");
            error=0;
        }
        catch(err){
            console.log("Error al borrar el usuario"+err);
        }
    }
    return error;  
 }

 async function registrarUsuario(nombre, usuario, password) {
    try {
        // Hashea la contraseña antes de almacenarla
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);

        // Crea un objeto de usuario con los detalles proporcionados
        const nuevoUsuario = {
            nombre: nombre,
            usuario: usuario,
            password: hash, // Almacena la contraseña hasheada
            // Agrega otros campos si es necesario
        };

        // Guarda el nuevo usuario en tu base de datos o sistema de almacenamiento
        await conexion.guardarUsuario(nuevoUsuario); // Reemplaza esto con tu función de guardado de usuarios

        // El usuario se ha registrado con éxito
        return { success: true, message: 'Registro exitoso' };
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el registro
        return { success: false, message: 'Error al registrar usuario: ' + error.message };
    }
}

 module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    buscarPorId,
    modificarUsuario,
    borrarUsuario,
    loginUsuario,
    registrarUsuario
 }