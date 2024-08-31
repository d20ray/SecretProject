const puppeteer = require('puppeteer-extra');
const fs = require("fs");
const player = require('play-sound')(opts = {});


async function paddysPintsLogic(stat){
  (async () => {
    const browser = await puppeteer.launch({ 
      headless: false, 
      defaultViewport: false,
      userDataDir: "./tmp", });

    const page = await browser.newPage();

    await page.goto('https://www.prisonblock.com/gym');

    const times = 10000;
    // let crawdad = 0;
    for (let i = 0; i < times; i++) {

      // crawdad = crawdad + 1;
      // if(crawdad === 7){
      //   await page.waitForSelector('.quickslot:nth-child(2) input:nth-child(1)', { visible: true });
      //   await page.click('.quickslot:nth-child(2) input:nth-child(1)');
      //   crawdad = 0;
      // }

      // console.log(crawdad);

      await page.waitForSelector('#um_mail');

      const mailCount = await page.$eval('#um_mail', el => el.textContent.trim());
      const eventCount = await page.$eval('#um_events', el => el.textContent.trim());

      if (mailCount !== '0' || eventCount !== '0') {
        player.play('./mp3/level-up.mp3');
      }

      await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
      await page.click('.quickslot:nth-child(3) input:nth-child(1)');

      try {
        await page.waitForSelector('.siteMessage', { visible: true });
        const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
      
        if (messageText.includes('You can not use items') || messageText.includes('Lightweight! This shit is too much for you!')) {
          console.log(messageText);
          await page.goto('https://www.prisonblock.com/icu');
          await page.waitForSelector('.g-recaptcha', { visible: true });
          await page.click('.g-recaptcha'); 
          await page.waitForSelector('.menu');
          await page.goto('https://www.prisonblock.com/gym');
        } else {
          console.log(messageText);
        }
      } catch (error) {
        console.error("The siteMessage element was not found or another error occurred:", error);
      }

      await page.waitForSelector(`form:nth-child(${stat}) .widebutton`, { visible: true });
      await page.click(`form:nth-child(${stat}) .widebutton`);
    }
  })();
}

module.exports = paddysPintsLogic;