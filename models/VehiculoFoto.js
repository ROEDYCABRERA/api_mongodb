import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VehiculoFotoSchema = new Schema({
   
    imagen : String
});

export const VehiculoFoto = model("VehiculoFoto", VehiculoFotoSchema);