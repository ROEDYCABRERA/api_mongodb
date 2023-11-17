import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
UsuarioSchema.pre("save", async function(next) {
    const user = this;

    if (!user.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Error al codificar la contraseña");
    }
});
UsuarioSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export const Usuario = model("Usuario", UsuarioSchema);