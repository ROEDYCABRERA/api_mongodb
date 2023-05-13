import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import authRoutes from "./routes/auth.route.js";
import procedureRouter from "./routes/procedure.route.js";
import marcaRouter from "./routes/marca.route.js";
import cookieParser from "cookie-parser";

const app = express();

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
//app.use("/api/v1/links", linkRouter);
//app.use(express.static("public"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("😍😍 http://localhost:" + PORT));

