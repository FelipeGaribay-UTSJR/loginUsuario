var ruta1=require("express").Router();
const { mostrarProductos, nuevoProducto, buscarPorId, modificarProducto, borrarProducto } = require("../bd/productosBD");


// Ruta para mostrar la lista de productos usando la vista "tabla.ejs"
ruta1.get("/api/", async (req, res) => {
     var products = await mostrarProductos();
     if(products.length>0){
          res.status(200).json(usuarios);
     }
     else{
          res.status(400).json("Productos no encontrados");
     }
 });

ruta1.post("/api/nuevoProducto",async(req,res)=>{
    var error= await nuevoProducto(req.body);
    if(error==0){
          res.status(200).json("Producto registrado correctamente");
    }
    else{
          res.status(400).json("Error al registrar producto");
    }
});

ruta1.get("/api/buscarPorId/:id", async(req,res)=>{
     var produc=await buscarPorId(req.params.id);
     if(produc!=undefined){
          res.status(200).json(produc);
     }
     else{
          res.status(400).json("Producto no encontrado");
     }

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