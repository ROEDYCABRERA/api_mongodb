import { Link } from "../models/Link.js";

export const redirectNanoLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        // console.log(nanoLink);
        const link = await Link.findOne({ nanoLink });

        if (!link)  return res.status(404).json({ error: "No existe el nanoLink" });

        return res.redirect(link.longLink);
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};