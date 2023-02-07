import express from "express";
import { getTopperList } from "../controller/list.js";

const router = express.Router();

router.get('/list', getTopperList);

export default router; 