var conexion =require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var products=[];
    try{
        var productos= await conexion.get();
        productos.forEach(producto =>{
     //console.log(usuario.data());
         var producto1=new Producto(producto.id,producto.data())
     //console.log("fghgfh");
     //console.log(usuario1);
     if (producto1.bandera==0){
        products.push(producto1.obtenerProducto);
     }
    })
    }catch(err){
        console.log("Error al recuperar productos mostrar usuarios"+err); 
     }
    
     return products;
    
}
async function nuevoProducto(newroducts){
    var error=0
    try{
        var producto1=new Producto(null,newroducts);
        console.log("Datos recibidos:", producto1); // Agregar esta línea para depurar
        if(producto1.bandera==0){
            conexion.doc().set(producto1.obtenerProducto);
            error=0;
        }
        else{
            console.log("datos incorrectos");
        }
       
    }
    catch(err){
        console.log("error al crear producto"+err);
    }
    return error;
 }
 async function buscarPorId(id){
    var produc;
    try{
        var productoBD=await conexion.doc(id).get();
        var productoObjeto=new Producto(productoBD.id, productoBD.data());
        if(productoObjeto.bandera==0){
            produc=productoObjeto.obtenerProducto;
        }
    }
    catch(err){
        console.log("Error al recuperar el usuario "+err);
    }
    return  produc;
 } 
 async function modificarProducto(datos){
    var error=1;
    var produc=await buscarPorId(datos.id);
    if(produc!=undefined){ 
    var produc=new Producto(datos.id, datos);
        if(produc.bandera==0){
            try{
                await conexion.doc(produc.id).set(produc.obtenerProducto);
                console.log("los datos se modificaron correctamente");
                error=0;
            }
            catch(err){
                cosole.log("Error al modificar al producto"+err);
                    
            }
        }else{
            console.log("Error los datos no son vlaidos");
        }       
    }
    return error;
}

 async function borrarProducto(id){
    var error=1;
    var produc=await buscarPorId(id);
    if(produc!=undefined){ 
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

 module.exports={
    mostrarProductos,
    nuevoProducto,
    buscarPorId,
    modificarProducto,
    borrarProducto
 };