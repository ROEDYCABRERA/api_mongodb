import mongoose from "mongoose";
const { Schema, model } = mongoose;

const sexoSchema = new Schema({
   
    Sexo: {
        type: String,
        required: [true, "El sexo es requerido"],
    }
});

export const Sexo = model("Sexo", sexoSchema);