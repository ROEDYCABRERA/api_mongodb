import mongoose from "mongoose";
const { Schema, model } = mongoose;

const VehiculoSchema = new Schema({
   
    Descripcion: {
        type: String,
        required: [true, "La descripcion es requerido"],
    },
    tipovehiculo:{
        type: Schema.Types.ObjectId,
        ref: 'TipoVehiculo'
    },
    marca:{
        type: Schema.Types.ObjectId,
        ref: 'Marca'
    },
    foto:{
        type: Schema.Types.ObjectId,
        ref: 'VehiculoFoto'
    },
    historia:{
        type: Schema.Types.ObjectId,
        ref: 'Historia'
    },
   
});

export const Vehiculo = model("Vehiculo", VehiculoSchema);