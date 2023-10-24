class Usuario{
    constructor (id, data){
        //console.log(id)
        //console.log(data.usuario);
        this.bandera=0;
        this.id=id;
        this.nombre=data.nombre;
        this.usuario=data.usuario;
        this.password=data.password;
        this.foto=data.foto;
        this.salt=data.salt;
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
set usuario(usuario){
    //console.log(usuario);
    this._usuario=usuario;
    //console.log(this._usuario);
    usuario.length>0?this._usuario=usuario:this.bandera=1;
   
}
set password(password){
    //console.log(password);
    this._password=password
    //console.log(this._password);
    password.length>0?this._password=password:this.bandera=1;
}

set salt(salt){
    salt.length>0?this._salt=salt:this.bandera=1;
}

set foto(foto){
    foto.length>0?this._foto=foto:this.bandera=1;
}

get id(){
    return this._id;
}
get nombre(){
    return this._nombre;
}
get usuario(){
    return this._usuario;
}
get password(){
    return this._password;
}

get salt(){
    return this._salt;
}

get foto(){
    return this._foto;
}


get obtenerUsuario(){
    if(this._id != null)

    return {
        id:this.id,
        nombre:this.nombre,
        usuario:this.usuario,
        password:this.password,
        foto:this.foto,
        salt:this.salt

    }
    else
    return{
        nombre:this.nombre,
        usuario:this.usuario,
        password:this.password,
        foto:this.foto,
        salt:this.salt
    }
    }      
}

module.exports=Usuario;
//los atributos son _nombre