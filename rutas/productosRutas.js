var ruta1=require("express").Router();
var subirArchivo=require("../middlewares/middlewares").subirArchivo;
const { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");
// Ruta para mostrar la lista de productos usando la vista "tabla.ejs"
ruta1.get("/listaProductos", async (req, res) => {
     var products = await mostrarProductos();
     res.render("productos/mostrarPro", { products });
 });
/*ruta1.get("/",async(req,res)=>{
     var produc=await mostrarProductos();
     //console.log(users);
     //res.end();
     res.render("productos/mostrar",{produc});
});*/
ruta1.get("/nuevoProducto",(req,res)=>{
     res.render("productos/nuevoPro");
});
ruta1.post("/nuevoproducto", subirArchivo(), async(req,res)=>{
    
     //console.log(error);
     
     //console.log(req.file.originalname);
     req.body.foto=req.file.originalname;
     //res.end();
     var error=await nuevoProducto(req.body);
     res.redirect("/");
 });

ruta1.get("/editarProducto/:id", async(req,res)=>{
     var produc=await buscarPorId(req.params.id);
     res.render("productos/modificarPro",{produc});
});

ruta1.post("/editarproducto",async(req,res)=>{
     var error=await modificarProducto(req.body);
     res.redirect("/listaProductos");
})
ruta1.get("/borrarProducto/:id",async(req,res)=>{
     await borrarProducto(req.params.id);
     res.redirect("/listaProductos");
})

module.exports=ruta1;