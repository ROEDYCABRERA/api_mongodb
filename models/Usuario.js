import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({

    NombreUsuario: {
        type: String,
        required: [true, "El Nombre del Usuario es requerido"],
    },
    Persona:{
        type: Schema.Types.ObjectId,
        ref: 'Persona'
    },
    TipoUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuario'
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerido"],
    },
});

export const Usuario = model("Usuario", UsuarioSchema);