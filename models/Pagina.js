import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paginaSchema = new Schema({
   
    Mensaje: {
        type: String,
        required: [true, "EL Mensaje es requerido"],
    },
});

export const Pagina = model("Pagina", paginaSchema);