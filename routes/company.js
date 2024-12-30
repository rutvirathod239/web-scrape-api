import express from "express";
import { deleteCompanyData, getCompanyData, getCompanyDetail } from "../controller/companyController.js";

export const companyRouter = express.Router();

companyRouter.get('/company', getCompanyData);
companyRouter.post('/company', deleteCompanyData);
companyRouter.get('/company/:id', getCompanyDetail);
