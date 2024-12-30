import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    url: String,
    name: String,
    description: String,
    logo: String,
    facebook: String,
    linkedin: String,
    twitter: String,
    instagram: String,
    address: String,
    phone: String,
    email: String,
  });
  
export const Company = mongoose.model("Company", companySchema);
