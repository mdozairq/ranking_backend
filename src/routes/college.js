import express from "express";
import { getAllCollege } from "../controller/college.js";

const router = express.Router();

router.get('/college', getAllCollege);

export default router; 