import express from "express";
import { getRankById } from "../controller/rank.js";

const router = express.Router();

router.get('/:reg_no', getRankById);

export default router; 