import { Router } from "express";
import {
    getDeposits,
    getDepositById,
    createDeposit,
    updateDeposit,
    deleteDeposit
} from "./deposits.controller.js";

const router = Router();

router.get('/', getDeposits);
router.get('/:id', getDepositById);
router.post('/', createDeposit);
router.put('/:id', updateDeposit);
router.delete('/:id', deleteDeposit);

export default router;