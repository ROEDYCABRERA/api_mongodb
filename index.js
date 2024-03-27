import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import fileUpload from "express-fileupload";
import authRoutes from "./routes/auth.route.js";
import procedureRouter from "./routes/procedure.route.js";
import marcaRouter from "./routes/marca.route.js";
import tipoDocumentoRouter from "./routes/tipoDocumento.route.js";
import tipoVehiculoRouter from "./routes/tipoVehiculo.route.js";
import tipoLibroRouter from "./routes/tipoLibro.route.js";
import sexoRouter from "./routes/sexo.route.js";
import paisRouter from "./routes/pais.route.js";
import autorRouter from "./routes/autor.route.js";
import personaRouter from "./routes/persona.route.js";
import libroRouter from "./routes/libro.route.js";
import usuarioRouter from "./routes/usuario.route.js";
import tipousuarioRouter from "./routes/tipoUsuario.route.js";
import paginaRouter from "./routes/pagina.route.js";
import paginatipousuarioRouter from "./routes/paginatipoUsuario.route.js";
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
import { Sexo } from "./models/Sexo.js";
import { Pais } from "./models/Pais.js";
import { Autor } from "./models/Autor.js";
import { Persona } from "./models/Persona.js";
import { Libro } from "./models/Libro.js";
import { TipoLibro } from "./models/TipoLibro.js";
import { TipoUsuario } from "./models/TipoUsuario.js";
import { Usuario } from "./models/Usuario.js";
import { Pagina } from "./models/Pagina.js";
import { PaginaTipoUsuario } from "./models/PaginaUsuario.js";
import { launch } from 'puppeteer';
import {setTimeout} from "node:timers/promises";
const app = express();
(async () => {
    const browser =  await launch({headless:false});
    const page = await browser.newPage();
    await page.goto("https://web.whatsapp.com/");
    await setTimeout(30000);
    await page.screenshot({path:'amazon1.jpg'});
    //await browser.close();
  })();
  

app.use(fileUpload({
    //useTempFiles : true,
    //tempFileDir : './uploads'
}));
//  const pagina= await Pagina.create({
//      Mensaje: 'Tipo Libro'
//   })
//   const pagina2= await Pagina.create({
//     Mensaje: 'Autor'
//  })
//  const pagina3= await Pagina.create({
//     Mensaje: 'Persona'
//  })
//  const pagina4= await Pagina.create({
//     Mensaje: 'Libro'
//  })
//  const pagina5= await Pagina.create({
//     Mensaje: 'Libro'
//  })
//  const pagina6= await Pagina.create({
//    Mensaje: 'Configuracion'
// })
// const pagina7= await TipoUsuario.create({
//     NombreTipoUsuario: 'programador',
//     DescripcionTipoUsuario:'ingeniero',
//     IDPAGINA:'1',
//     Habilitado:1
//  })
//   const pagina8= await PaginaTipoUsuario.create({
//     Pagina: pagina6.id,
//     TipoUsuario:pagina7.id,
//     Habilitado:1


//   })
// console.log('creado',pagina6)
//  console.log('creado',pagina7)
// console.log('creado',pagina8)
//  console.log('creado',pagina4)
//  console.log('creado',pagina5)
//  console.log('creado',pagina6)
//  console.log('creado',pagina7)
//  console.log('creado',pagina8)
// const tipoUsuario= await TipoUsuario.create({
//  NombreTipoUsuario: 'administrador',
//     DescripcionTipoUsuario:'Gerente',
//      IDPAGINA:'1',
//      Habilitado:0
//     })
//   console.log('creado',tipoUsuario)
//  const persona= await Persona.create({
//     Nombre: 'JOSUE ADIEL',
//     ApPaterno:'CABRERA',
//     ApMaterno:'CORDOVA',
//     FechaNacimiento:'12/10/2022',
//     Correo:'josue@gmail.com',
//     Telefono:'947590099',

//  })
//  const usuario= await Usuario.create({
//     NombreUsuario: 'admin',
//     Persona:persona._id,
//     TipoUsuario:tipoUsuario._id
//  })
//  console.log('creado',tipoUsuario)
//  console.log('creado',persona)
//  console.log('creado',usuario)
// const autor= await Autor.create({       
//       Nombre: 'ROSA MARIA',
//       ApPaterno: "TORIBIO",
//       ApMaterno: "PEREZ",
//       Sexo: "65428963357cddff6f0b2163",
//       Pais: "65428966357cddff6f0b2166"
// });
//  const libro= await Libro.create({          
//     Titulo: 'JESUS EL REY DE REYES',
//     Resumen:'CRISTO VINO A SALVAR AL MUNDO DE LA CONDENACION ETERNA',
//     NumeroPagina:100,
//     Stock:500,
//     FotoCaratula:'https://cdn.bibliatodo.com/assets/img/es/situacion/cat/salvacion.jpg',
//     Autor:autor.id,
//     TipoLibro:tipoLibro.id

// });
// console.log('creado',tipoLibro)
// console.log('creado',autor)
//  console.log('creado',libro)

// const persona= await Persona.create({
//        Nombre: 'JUANA', 
//       ApPaterno: 'GONZALEZ',    
//        ApMaterno: 'RAMIREZ', 
//        Telefono: '974590099', 
//       FechaNacimiento:'02/11/2023',
//       Correo:'JUAN@gmail.com'

//      });
// // /// //  console.log('creado',pais)
//  console.log('creado',persona)


//  const procedimiento= await Procedure.create({
//     descripcion: 'INSTALACION',
//     precio:0

//  });
// const tipoDocumento= await TipoDocumento.create({
//      Descripcion: 'PASAPORTE'

// });
// const tipovehiculo= await TipoVehiculo.create({
//      Descripcion: 'TIPO'

//  });
//  const marca= await Marca.create({
//      Descripcion: 'HONDA'

//  });
//  const foto= await VehiculoFoto .create({
//      imagen: 'foto'

//  });

//  const detalles= await Detalles .create({
//      Procedimiento: 'cambio de aceite',
//      ManoObra: 100,
//      PrecioRepuesto: 100,
//      Observacion: 'obervacion'
//  });
// const historia= await Historia .create({
//     Mileage: 0,
//     Remarks: 'Remarks',
//     detalles:detalles._id,


// });
// const vehiculo= await Vehiculo.create({
//     Descripcion: 'VEHICULO',
//     tipovehiculo:tipovehiculo._id,
//      marca:marca._id,
//      foto:foto._id,
//      historia:historia._id,
//  });

// const usuarioInicial= await User.create({
//      nombre: 'ROEDY',
//      apellido: 'CABRERA',
//      direccion :'LIMA',
//      email:'admin@gmail.com',
//      password: '123456',
//      tipo_usuario : 'admin',
//      tipo_login :'admin',
//      telefono:'974590099',
//      tipodocumento:tipoDocumento._id,
//      procedimiento:procedimiento._id,
//      vehiculo:vehiculo._id,
//      });

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
app.use("/api/v1/tipoLibro", tipoLibroRouter);
app.use("/api/v1/tipoVehiculo", tipoVehiculoRouter);
app.use("/api/v1/sexo", sexoRouter);
app.use("/api/v1/pais", paisRouter);
app.use("/api/v1/autor", autorRouter);
app.use("/api/v1/persona", personaRouter);
app.use("/api/v1/libro", libroRouter);
app.use("/api/v1/usuario", usuarioRouter);
app.use("/api/v1/tipousuario", tipousuarioRouter);
app.use("/api/v1/pagina", paginaRouter);
app.use("/api/v1/paginatipousuario", paginatipousuarioRouter);
//app.use("/api/v1/links", linkRouter);
//app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("😍😍 http://localhost:" + PORT));

