import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HistoriaSchema = new Schema({
   
    Mileage  : {
        type: Number,
        required: [true, "La Mileage es requerido"],
    },
    Remarks : {
        type: String,
        required: [true, "La Remarks es requerido"],
    },
    detalles:{
        type: Schema.Types.ObjectId,
        ref: 'Detalles'
    },
});

export const Historia = model("Historia", HistoriaSchema);