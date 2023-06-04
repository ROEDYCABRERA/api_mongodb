import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.route.js";
import procedureRouter from "./routes/procedure.route.js";
import marcaRouter from "./routes/marca.route.js";
import tipoDocumentoRouter from "./routes/tipoDocumento.route.js";
import tipoVehiculoRouter from "./routes/tipoVehiculo.route.js";
import cookieParser from "cookie-parser";
import { User } from "./models/User.js";
import { TipoDocumento } from "./models/TipoDocumento.js";
import { Vehiculo } from "./models/Vehiculo.js";
import { TipoVehiculo } from "./models/TipoVehiculo.js";
import { Marca } from "./models/Marca.js";
import { VehiculoFoto  } from "./models/VehiculoFoto.js";
import { Historia  } from "./models/History.js";
import { Procedure  } from "./models/Procedure.js";
import { Detalles  } from "./models/Detalles.js";
const app = express();

app.use(fileUpload({
    //useTempFiles : true,
    //tempFileDir : './uploads'
}));

// const tipoDocumento= await TipoDocumento.create({
//     Descripcion: 'CEDULA'

// });

// const procedimiento= await Procedure.create({
//     descripcion: 'INSTALACION',
//     precio:0

// });
// const tipovehiculo= await TipoVehiculo.create({
//     Descripcion: 'TIPO'

// });
// const marca= await Marca.create({
//     Descripcion: 'HONDA'

// });
// const foto= await VehiculoFoto .create({
//     imagen: 'foto'

// });

// const detalles= await Detalles .create({
//     Procedimiento: 'cambio de aceite',
//     ManoObra: 100,
//     PrecioRepuesto: 100,
//     Observacion: 'obervacion'
// });
// const historia= await Historia .create({
//     Mileage: 0,
//     Remarks: 'Remarks',
//     detalles:detalles._id,


// });
// const vehiculo= await Vehiculo.create({
//     Descripcion: 'VEHICULO',
//     tipovehiculo:tipovehiculo._id,
//     marca:marca._id,
//     foto:foto._id,
//     historia:historia._id,

// });

// const usuarioInicial= await User.create({
//     nombre: 'ROEDY',
//     apellido: 'CABRERA',
//     direccion :'LIMA',
//     email:'cabrera1545585lzz1@gmail.com',
//     password: '123456',
//     tipo_usuario : 'admin',
//     tipo_login :'admin',
//     tipodocumento:tipoDocumento._id,
//     procedimiento:procedimiento._id,
//     vehiculo:vehiculo._id,
// });

// console.log('creado',usuarioInicial)
// const whiteList = [process.env.ORIGIN1];
// app.use(
//     cors({
//         origin: function (origin, callback) {
//             console.log("😲😲😲 =>", origin);
//             if (!origin || whiteList.includes(origin)) {
//                 return callback(null, origin);
//             }
//             return callback(
//                 "Error de CORS origin: " + origin + " No autorizado!"
//             );
//         },
//         credentials: true,
//     })
// );
app.use(cookieParser());
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Bienvenido API REST ');
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/procedure", procedureRouter);
app.use("/api/v1/marca", marcaRouter);
app.use("/api/v1/tipoDocumento", tipoDocumentoRouter);
app.use("/api/v1/tipoVehiculo", tipoVehiculoRouter);
//app.use("/api/v1/links", linkRouter);
//app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("😍😍 http://localhost:" + PORT));

