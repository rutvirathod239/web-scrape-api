import { Company } from "../models/Company.js";
import { errorResponse, successResponse } from "../utils/utils.js";
import { connectToDatabase } from "../dbConnect.js";

export const getCompanyData = async ( req, res ) => {
    try {
        await connectToDatabase();
        const companyList = await Company.find();
        successResponse(res, 200, 'success', companyList);
    } catch (error) {
        console.log("🚀 ~ getCompanyData ~ error:", error);
        errorResponse(res, 500, error);
    }
}

export const deleteCompanyData = async (req, res) => {
    try {
        await connectToDatabase();
        const { ids } = req.body;
        for await(const id of ids) {
            await Company.findByIdAndDelete(id);
        }
        successResponse(res, 200, 'success');
    } catch (error) {
        console.log("🚀 ~ deleteCompanyData ~ error:", error)        
    }
}

export const getCompanyDetail = async (req, res) => {
    try {
        await connectToDatabase();
        const { id } = req.params;
        const company = await Company.findById(id);
        successResponse(res, 200, 'success', company);
    } catch (error) {
        console.log("🚀 ~ getCompanyDetail ~ error:", error);        
    }
}