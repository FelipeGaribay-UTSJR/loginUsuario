var express=require("express");
const session = require("express-session");
var path=require("path");
var cors=require("cors");
var rutasUsuarios=require("./rutas/usuariosRutas");
var rutasProductos=require("./rutas/productosRutas");
var rutasUsuariosApis=require("./rutas/usuariosRutasApis");
var rutasProductosApis=require("./rutas/productosRutasApis");
require("dotenv").config();

var app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use("/", rutasUsuarios);
app.use("/",rutasProductos);
app.use("/",rutasUsuariosApis);
app.use("/",rutasProductosApis);
app.use(session({
    secret:process.env.secretoOo, // Cambia esto a una cadena de texto secreta
    resave: false,
    saveUninitialized: true,
}));

var port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});
