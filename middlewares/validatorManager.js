import axios from "axios";
import { body, cookie, header, validationResult,param  } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    next();
};
export const paramLinkValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const bodyLinkValidator = [
    body("longLink", "formato link incorrecto")
        .trim()
        .notEmpty()
        .custom(async (value) => {
            try {
                if (!value.startsWith("https://")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                // console.log(error);
                throw new Error("not found longlink 404");
            }
        }),
    validationResultExpress,
];
export const bodyLoginValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    validationResultExpress,
];

export const bodyRegisterValidator = [
    body("email", "Formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecta").custom(
        (value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("No coinciden las contraseñas");
            }
            return value;
        }
    ),
    validationResultExpress,
];
export const paramNanoLinkValidator = [
    param("nanoLink", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
        
    validationResultExpress,
];

export const paramProcedureValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const bodyProcedureValidator = [
    body("descripcion", "Formato de descripcion incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
   body("precio", "Formato de precio incorrecto")
         .notEmpty(),
         
    validationResultExpress,
];

export const bodyMarcaValidator = [
    body("Descripcion", "Formato de descripcion incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];
export const bodyPersonaValidator = [
         body("Nombre", "Formato de Nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("ApPaterno", "Formato de Nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("ApMaterno", "Formato de Nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("Correo", "Formato de email incorrecto")
         .trim()
         .isEmail()
         .normalizeEmail(),
         body("Telefono", "Mínimo 9 carácteres").trim().isLength({ min: 9 }),
    validationResultExpress,
];

export const paramMarcaValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramPersonaValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const bodyTipoDocumentoValidator = [
    body("Descripcion", "Formato de descripcion incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];
export const bodyTipoUsuarioValidator = [
  body("NombreTipoUsuario", "Formato de NombreTipoUsuario incorrecto")
    .notEmpty()
    .isLength({ max: 50 }),
  body("DescripcionTipoUsuario", "Formato de DescripcionTipoUsuario incorrecto")
    .notEmpty()
    .isLength({ max: 50 }),
  validationResultExpress,
];
export const bodyPaginaTipoUsuarioValidator = [
    body("Pagina", "Formato de Pagina incorrecto")
      .notEmpty()
      .isLength({ max: 50 }),
    body("TipoUsuario", "Formato de TipoUsuario incorrecto")
      .notEmpty()
      .isLength({ max: 50 }),
      body("Habilitado", "Formato de Habilitado incorrecto")
      .notEmpty()
      .isLength({ max: 1 }),
    validationResultExpress,
  ];


export const paramTipoDocumentoValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramTipoUsuarioValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramPaginaTipoUsuarioValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramTipoLibroValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramAutorValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramLibroValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const paramSexoValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const paramPaisValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
export const bodyTipoLibroValidator = [
    body("Nombre", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("Descripcion", "Formato de descripcion incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];
export const bodyAutorValidator = [
        body("Nombre", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("ApPaterno", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
         body("ApMaterno", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];
export const bodyLibroValidator = [
  body("Titulo", "Formato de Titulo incorrecto")
    .notEmpty()
    .isLength({ max: 50 }),
  validationResultExpress,
  body("id", "Formato de id incorrecto")
  .notEmpty()
  .isLength({ max: 50 }),
  validationResultExpress,
];
export const bodySexoValidator = [
    body("Nombre", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];
export const bodyPaisValidator = [
    body("Nombre", "Formato de nombre incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];

export const bodyTipoVehiculoValidator = [
    body("Descripcion", "Formato de descripcion incorrecto")
         .notEmpty()
         .isLength({ max: 50 }),
    validationResultExpress,
];

export const paramTipoVehiculoValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const paramUsuarioValidator = [
    param("id", "Formato no válido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
