import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tipoVehiculoSchema = new Schema({
   
    Descripcion: {
        type: String,
        required: [true, "La descripcion es requerido"],
    }
});

export const TipoVehiculo = model("TipoVehiculo", tipoVehiculoSchema);