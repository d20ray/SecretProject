const puppeteer = require('puppeteer');
const fs = require("fs");

function candyCornLogic(){
  (async () => {
    const browser = await puppeteer.launch({ 
      headless: false, 
      defaultViewport: false,
      userDataDir: "./tmp", });
  
    const page = await browser.newPage();
  
    await page.goto('https://www.prisonblock.com/gym');
  
    const times = 1000;
    for (let i = 0; i < times; i++) {
      await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
      await page.click('.quickslot:nth-child(3) input:nth-child(1)');
  
      await page.waitForSelector('form:nth-child(5) .widebutton', { visible: true });
      await page.click('form:nth-child(5) .widebutton');
    }
  })();
}

module.exports = candyCornLogic;

