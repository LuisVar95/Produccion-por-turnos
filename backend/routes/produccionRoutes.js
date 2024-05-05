import express from "express";
import { obtenerProduccion, crearRegistro } from "../controllers/produccionController.js";

const router = express.Router();

router.get("/produccion/:anio/:mes/:dia/:rangoHora", obtenerProduccion);
router.post("/produccion/crear-registro", crearRegistro);

export default router;