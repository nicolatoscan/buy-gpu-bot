import puppeteer from 'puppeteer-core'
import { wait } from './utils'

import dotenv from 'dotenv'
dotenv.config();

const PAYPAL_EMAIL = process.env.PAYPAL_EMAIL ?? "";
const PAYPAL_PASSWORD = process.env.PAYPAL_PASSWORD ?? "";

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'chrome.exe',
        headless: false
    });

    const page = await browser.newPage();

    const pageUrl = 'https://www.unieuro.it/online/Cuffie/MDR-ZX110-pidSONMDRZX110BAE'
    await page.goto(pageUrl);

    // CLICK BUY WITH PAYPAL
    const buyWithPaypalBtn = await page.waitForSelector('.cta-paypalec div span');
    buyWithPaypalBtn?.click();
    console.log('CLICK BUY WITH PAYPAL');
    await wait(1000)
    
    // CLICK CONTINUE TO PAYPAL
    const continuePaypalClick = await page.waitForSelector('div .warranty-modal-buttons.js--mobile-paypalec button.btn-blue-normal.addToCartClick');
    continuePaypalClick?.click()
    console.log('CLICK CONTINUE TO PAYPAL');

    // FILL PAYPAL EMAIL
    await page.waitForNavigation()
    await page.waitForSelector('#email');
    await page.type("#email", PAYPAL_EMAIL);

    await wait(30000)

    await browser.close();
})()