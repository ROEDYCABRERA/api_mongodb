import mongoose from "mongoose";
const { Schema, model } = mongoose;

const procedureSchema = new Schema({
    descripcion: {
        type: String,
        required: [true, "La descripcion es requerido"],
        trim: true,
    },
    precio: {
        type: Number,
        required: true
    }
});

export const Procedure = model("Procedure", procedureSchema);