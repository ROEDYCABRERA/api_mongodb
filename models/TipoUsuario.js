import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tipoUsuarioSchema = new Schema({
   
    NombreTipoUsuario: {
        type: String,
        required: [true, "El Nombre Tipo Usuario es requerido"],
    },
    DescripcionTipoUsuario: {
        type: String,
        required: [true, "La Descripcion Tipo Usuario es requerido"],
    },
    IDPAGINA:  [{
        type: String
    }],
    Habilitado: {
        type: Number,
        required: true
    }
});

export const TipoUsuario = model("TipoUsuario", tipoUsuarioSchema);