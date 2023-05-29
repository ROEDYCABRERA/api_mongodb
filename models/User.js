import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    apellido: {
        type: String,
        required: true,
    },
    direccion : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
   
    tipo_usuario : {
        type: String,
        required: true
    },

    tipo_login : {
        type: String,
        required: true
    },

    tipodocumento:{
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    procedimiento:{
        type: Schema.Types.ObjectId,
        ref: 'Procedure'
    },
    vehiculo:{
        type: Schema.Types.ObjectId,
        ref: 'Vehiculo'
    },
   


    

});
userSchema.pre("save", async function(next) {
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
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
export const User = mongoose.model("User", userSchema);
