import { Schema, model } from "mongoose";

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    link: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },
});

export default model(`Productos`, productoSchema);