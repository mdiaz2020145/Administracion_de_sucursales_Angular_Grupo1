export class SucursalProducto{
    constructor(
    public _id:String, 
    public idSucursal:String,
    public  nombreProducto: String,
    public cantidadProducto: Number,
    public  vendido: Number,
    public  precio: Number,
    ){}
}