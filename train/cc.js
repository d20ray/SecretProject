const puppeteer = require('puppeteer');
const fs = require("fs");

function candyCornLogic(stat){
  (async () => {
    const browser = await puppeteer.launch({ 
      headless: false, 
      defaultViewport: false,
      userDataDir: "./tmp", });
  
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
  
    await page.goto('https://www.prisonblock.com/gym');
  
    const times = 10000;
    for (let i = 0; i < times; i++) {

      const cookies = await client.send('Network.getAllCookies');
      const keepCookies = ['pbpid', 'lastuser'];
      const cookiesToKeep = cookies.cookies.filter(cookie => 
          keepCookies.includes(cookie.name) && cookie.domain.includes('prisonblock.com')
      );
      await client.send('Network.clearBrowserCookies');
      for (let cookie of cookiesToKeep) {
          await client.send('Network.setCookie', cookie);
      }

      await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
      await page.click('.quickslot:nth-child(3) input:nth-child(1)');
  
      await page.waitForSelector(`form:nth-child(${stat}) .widebutton`, { visible: true });
      await page.click(`form:nth-child(${stat}) .widebutton`);
    }
  })();
}

module.exports = candyCornLogic;

