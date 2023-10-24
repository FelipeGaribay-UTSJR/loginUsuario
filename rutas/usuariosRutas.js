var ruta = require("express").Router();
const bcrypt = require('bcrypt');
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario, loginUsuario, registrarUsuario} = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    var users = await mostrarUsuarios();
    //console.log(users);
    res.render("usuarios/mostrar", {users});
});

ruta.get("/nuevousuario",(req,res)=>{
    res.render("usuarios/nuevo");
}); 

ruta.post("/nuevousuario", subirArchivo(), async(req,res)=>{
    req.body.foto=req.file.originalname;

    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});

ruta.get("/editarUsuario/:id", async (req, res) => {
    const user = await buscarPorId(req.params.id);
    //console.log(req.params.id);
    //console.log(user);
    //res.end();
    res.render('usuarios/modificar', {user});
  });

  ruta.post("/editarUsuario",async(req,res)=>{
    var error=await modificarUsuario(req.body);
    console.log("error");
    res.redirect("/");
 });

ruta.get("/borrarUsuario/:id", async (req,res)=>{
   await borrarUsuario(req.params.id);
   res.redirect("/");
})


ruta.get('/registro', (req, res) => {
    res.render('usuarios/nuevo');
});


ruta.post("/registro", subirArchivo(), async(req,res)=>{
    req.body.foto=req.file.originalname;

    var error=await nuevoUsuario(req.body);
    res.redirect("/");
});


ruta.get('/login', (req, res) => {
    res.render('login');
});


ruta.post("/login", async(req, res) => {
    var error=await loginUsuario(req.body);

    console.log(error);
    if(error == 1) {
         res.redirect("/")
    } else if(error == 0){
         res.redirect("/mostrar") 
    }
});


module.exports = ruta;