class Producto{
    constructor (id, data){
        //console.log(id)
        //console.log(data.usuario);
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.categoria=data.categoria;
        this.precio=data.precio;
        this.foto=data.foto;
    }

set id(id){
    //if(id != null)
    //this._id=id
    //console.log(id.length);
    //id.length>0?this._id=id:this.bandera=1;
    if (id !== null && id.length > 0) {
        this._id = id;
      } 

}
set nombre(nombre){
    //console.log(nombre);
    this._nombre=nombre;
    //console.log(this._nombre);
    nombre.length>0?this._nombre=nombre:this.bandera=1;
}
set categoria(categoria){
    //console.log(usuario);
    this._categoria=categoria;
    //console.log(this._usuario);
    categoria.length>0?this._categoria=categoria:this.bandera=1;
   
}
set precio(precio){
    //console.log(password);
    this._precio=precio
    //console.log(this._password);
    precio.length>0?this._precio=precio:this.bandera=1;
}
set foto(foto){
    this._foto=foto
    this.foto.length>0?this._foto=this.foto:this.bandera=1;
}


get id(){
    return this._id;
}
get nombre(){
    return this._nombre;
}
get categoria(){
    return this._categoria;
}
get precio(){
    return this._precio;
}
get foto(){
    return this._foto;
}
get obtenerProducto(){
    if(this._id != null)

    return {
        id:this.id,
        nombre:this.nombre,
        categoria:this.categoria,
        precio:this.precio,
        foto:this.foto

    }
    else
    return{
        nombre:this.nombre,
        categoria:this.categoria,
        precio:this.precio,
        foto:this.foto
    }
    }
           
}

module.exports=Producto;
//los atributos son _nombre