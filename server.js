import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { scrapeRouter } from "./routes/scraper.js";
import { companyRouter } from "./routes/company.js";

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors());

app.use('/api', scrapeRouter);
app.use('/api', companyRouter);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
