import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    autor: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true },
}, {
    versionKey: false 
});

export default model(`Messages`, messageSchema);
