import express from "express";
import { getRank, getRankById } from "../controller/rank.js";

const router = express.Router();

router.get('/all', getRank);
router.get('/:reg_no', getRankById);

export default router; 