import puppeteer from 'puppeteer-core'
import { wait } from './utils'

import dotenv from 'dotenv'
dotenv.config();

const UNI_EMAIL = process.env.UNI_EMAIL ?? "";
const UNI_PASSWORD = process.env.UNI_PASSWORD ?? "";

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'chrome.exe',
        headless: false
    });

    const page = await browser.newPage();

    const pageUrl = 'https://www.unieuro.it/online/Cuffie/MDR-ZX110-pidSONMDRZX110BAE'
    await page.goto(pageUrl);

    
    // CLICK CONTINUE TO PAYPAL
    const addToCartBtn = await page.waitForSelector('.btn, .btn-orange-normal, .addtocart, .addToCartClick');
    addToCartBtn?.click()
    console.log('ADD TO CART');
    
    // CHECK OUT
    const checkOutBtn = await page.waitForSelector('#wrapper > div.container > div.content.cart.cartpage > div.cart-container > section.summary-cart-full-container > article > div > article.submit-container > div.cta-container > a');
    await wait(1000)
    checkOutBtn?.click()
    console.log('CHECK OUT');

    await page.waitForNavigation();
    await page.waitForSelector('#j_username')

    await page.$eval('#j_username', (el, value) => (el as any).value = value, UNI_EMAIL);
    await page.$eval("[name='j_password']", (el, value) => (el as any).value = value, UNI_PASSWORD);
    await wait(500);
    await page.click('#command > div.btn-login > input')
    console.log("LEGGED IN");


    await wait(1000)
    const spedizioneToClick = await page.waitForSelector('#wrapper > div > div.content.checkout > div.left-container > div > section.shipping-choose-mode-container > div.item-container.item-container-left.block-checkout > div > div.delivery-head > span.check-container > i')
    spedizioneToClick?.click()
    console.log("SELECTED SPEDIZIONE");
    
    await wait(500)
    const indirizzoToClick = await page.waitForSelector('#checkout-register-data > section > div.buttons')
    indirizzoToClick?.click()
    console.log("SELECTED INDIRIZZO");

    await wait(1000)
    const vaiAPagareToClick = await page.waitForSelector('#payment')
    vaiAPagareToClick?.click()
    console.log("PAGARE CLICK");
    
    
    await wait(300)
    await page.waitForNavigation()
    await wait(300)
    const scontrinoToClick = await page.waitForSelector('#modifyBillingDataForm > section > div.buttons > button')
    scontrinoToClick?.click()
    console.log("SCONTRINO CLICK");
    
    
    
    await wait(1000)
    const cartoneToClick = await page.waitForSelector('#choosePaymentForm > article > div > span.IngenicoCard.js--choose-method')
    await cartoneToClick?.click()
    const cazzateToClick = await page.waitForSelector('#condition')
    await cazzateToClick?.click()
    console.log("SELECT CARD");
    await wait(888088)


    await browser.close();
})()