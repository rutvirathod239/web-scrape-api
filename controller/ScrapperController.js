import { load } from "cheerio";
import puppeteer from "puppeteer";
import axios from "axios";
import { Company } from "../models/Company.js";
import { errorResponse, successResponse } from "../utils/utils.js";
import { connectToDatabase } from "../dbConnect.js";

export const createScrapeData = async (req, res) => {
    if (!req.body.url) {
        errorResponse(res, 404, 'Please provide valid web url');
    }
    const { url } = req.body;
    try {
        await connectToDatabase();
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });

        const html = await page.content();
        const $ = load(html);
        // const { data } = await axios.get(url);
        // const $ = load(data);

        const company = {
            name: $("title").text() || null,
            description: $('meta[name="description"]').attr("content") || null,
            logo: $("link[rel='icon']").attr("href") || $("link[rel='shortcut icon']").attr("href") || $('link[rel="apple-touch-icon"]').attr("href") || null,
            facebook: $("a[href*='facebook.com']").attr("href") || $("a[href*='facebook.com']").parent().attr("href") || null,
            linkedin: $("a[href*='linkedin.com']").attr("href") || $("a[href*='linkedin.com']").parent().attr("href") || null,
            twitter: $("a[href*='twitter.com']").attr("href") || $("a[href*='twitter.com']").parent().attr("href") || null,
            instagram: $("a[href*='instagram.com']").attr("href") || $("a[href*='instagram.com']").parent().attr("href") || null,
            address: $("address").text().trim() || null,
            phone: $("a[href^='tel:']").attr("href")?.replace("tel:", "") || null,
            email: $("a[href^='mailto:']").attr("href")?.replace("mailto:", "") || null,
            url
        };
        await browser.close();

        const savedCompany = new Company(company);
        await savedCompany.save();
        successResponse(res, 200, savedCompany, 'Data Saved Successfully!');

    } catch (error) {
        errorResponse(res, 500, error);
    }
}

export const takeScreenshot = async (req, res) => {
    try {
        const { url } = req.body;
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
        const screenshotBuffer = await page.screenshot({
            type: "png",
            fullPage: true
        });

        await browser.close();

        res.set("Content-Type", "image/png");
        res.send(screenshotBuffer);
         
    } catch (error) {
        console.log("🚀 ~ takeScreenshot ~ error:", error)        
    }
}