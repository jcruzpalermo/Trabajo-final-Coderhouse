class ProductoDTO{
    constructor (producto){
        this.id = producto._id
        this.nombre = producto.nombre
        this.descripcion = producto.descripcion
        this.link = producto.link
        this.precio = producto.precio
        this.categoria = producto.categoria
        this.cantidad = producto.cantidad
    }
}

export default ProductoDTO;