import Produccion from "../models/Produccion.js";
import { Sequelize } from "sequelize";

const obtenerProduccion = async (req, res) => {
    const { anio, mes, dia, rangoHora } = req.params;
    let horaInicio, horaFin;

    // Determinar el rango de horas
    switch (rangoHora) {
        case '7am-3pm':
            horaInicio = 7;
            horaFin = 14;
            break;
        case '3pm-11pm':
            horaInicio = 15;
            horaFin = 22;
            break;
        default:
            // Manejar un rango de horas inválido si es necesario
            break;
    }

    // Filtrar por hora en un rango específico
    const registros = await Produccion.findAll({
        where: {
            fecha: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('fecha')), anio),
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('fecha')), mes),
                    Sequelize.where(Sequelize.fn('DAY', Sequelize.col('fecha')), dia),
                    Sequelize.where(Sequelize.fn('HOUR', Sequelize.col('fecha')), {
                        [Sequelize.Op.between]: [horaInicio, horaFin]
                    })
                ]
            }
        }
    });

    // Formatear la fecha de cada registro
    const registrosFormateados = registros.map((registro) => {
        return {
            ...registro.toJSON(),
            fecha: registro.fecha.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
        };
    });

    res.json({ registrosFormateados });
}

const crearRegistro = async (req, res) => {
    try {
        const { fecha, turno, cantidadProducida, producto, lineaProduccion} = req.body;

        const registro = await Produccion.create({
            fecha,
            turno,
            cantidadProducida,
            producto,
            lineaProduccion
        })

        return res.status(201).json({ registro })
    } catch (error) {
        console.error('Error al crear el registro:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export {
    obtenerProduccion,
    crearRegistro
}