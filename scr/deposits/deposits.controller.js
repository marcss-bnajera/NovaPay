`use strict`

import { Deposit } from "./deposits.model.js"

// Obtener todos los depósitos (GET)
export const getDeposits = async (req, res) => {
    try {
        const deposits = await Deposit.findAll();
        res.status(200).json({
            success: true,
            total: deposits.length,
            deposits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener depósitos",
            error: error.message
        });
    }
};

// Obtener depósito por ID (GET)
export const getDepositById = async (req, res) => {
    try {
        const { id } = req.params;
        const deposit = await Deposit.findByPk(id);

        if (!deposit) {
            return res.status(404).json({
                success: false,
                message: "Depósito no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            deposit
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: "Error al buscar el depósito",
            error: error.message
        })
    }
}

// Crear (POST)
export const createDeposit = async (req, res) => {
    try {
        const { cuenta_id, monto, fecha, estado } = req.body;

        const deposit = await Deposit.create({
            cuenta_id,
            monto,
            fecha,
            estado
        });

        res.status(201).json({
            success: true,
            message: "Depósito realizado con éxito"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear el depósito",
            error: error.message
        });
    }
};

// Actualizar (PUT)
export const updateDeposit = async (req, res) => {
    try {
        const { id } = req.params;
        const { monto, estado } = req.body;

        const { updateRows } = await Deposit.update(
            { monto, estado },
            { where: { id } }
        );

        if (updateRows === 0) {
            return res.status(404).json({
                succes: false,
                message: "Depósito no encontrado o no hubo cambios"
            });
        }

        res.status(200).json({
            success: true,
            message: "Depósito actualizado exitosamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar ",
            error: error.message
        });
    }
};

// Eliminar (DELETE)
export const deleteDeposit = async (req, res) => {
    try {
        const { id } = req.params;

        const deleteRows = await Deposit.destroy({
            where: { id }
        });

        if (deleteRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Depósito no encontrado"
            });
        }

        res.status(200).json({
            success: true,
            message: "Depósito eliminado permanentemente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el depósito",
            error: error.message
        });
    }
}