import express from "express";
import { createScrapeData, takeScreenshot } from "../controller/ScrapperController.js";

export const scrapeRouter = express.Router();

scrapeRouter.post('/scrape', createScrapeData);
scrapeRouter.post('/screenshot', takeScreenshot);
