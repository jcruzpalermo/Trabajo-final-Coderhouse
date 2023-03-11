import { Schema, model } from "mongoose";

const ordenesSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
    owner: { type: Array, require: true }
});

export default model(`Ordenes`, ordenesSchema);