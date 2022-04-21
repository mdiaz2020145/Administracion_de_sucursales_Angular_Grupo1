export class EmpresaProducto{
    constructor(
        public _id: String,
        public nombreProducto: String,
        public nombreProveedor:String,
        public cantidad:Number, 
        public precio:Number
    ){}
}