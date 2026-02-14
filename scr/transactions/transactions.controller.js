`use strict`

import { Transaction } from "./transactions.model.js";

// Ver todas
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json({ success: true, total: transactions.length, transactions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching transactions", error: error.message });
    }
};

// Ver por ID
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findByPk(id);
        if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
        res.status(200).json({ success: true, transaction });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error searching transaction", error: error.message });
    }
};

// Agregar
export const createTransaction = async (req, res) => {
    try {
        const { sender_account_id, receiver_account_id, amount } = req.body;
        await Transaction.create({ sender_account_id, receiver_account_id, amount });
        res.status(201).json({ success: true, message: "Transaction created" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating transaction", error: error.message });
    }
};

// Editar
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { sender_account_id, receiver_account_id, amount } = req.body;
        const [updatedRows] = await Transaction.update(
            { sender_account_id, receiver_account_id, amount },
            { where: { id } }
        );
        if (updatedRows === 0) return res.status(404).json({ success: false, message: "Transaction not found" });
        res.status(200).json({ success: true, message: "Transaction updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating transaction", error: error.message });
    }
};

// Eliminar
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Transaction.destroy({ where: { id } });
        if (deletedRows === 0) return res.status(404).json({ success: false, message: "Transaction not found" });
        res.status(200).json({ success: true, message: "Transaction deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting transaction", error: error.message });
    }
};