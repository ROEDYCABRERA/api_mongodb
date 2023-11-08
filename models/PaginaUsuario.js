import mongoose from "mongoose";
const { Schema, model } = mongoose;

const paginatipoUsuarioSchema = new Schema({
   
    Pagina:{
        type: Schema.Types.ObjectId,
        ref: 'Pagina'
    },
    TipoUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuario'
    },
    Habilitado: {
        type: Number,
        required: true
    }
});

export const PaginaTipoUsuario = model("PaginaTipoUsuario", paginatipoUsuarioSchema);