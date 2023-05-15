import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tipoDocumentoSchema = new Schema({
   
    Descripcion: {
        type: String,
        required: [true, "La descripcion es requerido"],
    }
});

export const TipoDocumento = model("TipoDocumento", tipoDocumentoSchema);