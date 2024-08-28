const puppeteer = require('puppeteer');
const fs = require("fs");
const player = require('play-sound')(opts = {});

function southDakotaCrime(){
    (async () => {
        const browser = await puppeteer.launch({ 
          headless: false, 
          defaultViewport: false,
          userDataDir: "./tmp", 
        });
    
        const page = await browser.newPage();
    
        await page.goto('https://www.prisonblock.com/crimes/steal-weapon');

        await page.waitForSelector('.g-recaptcha', { visible: true });
        await page.click('.g-recaptcha'); 
    
        for (var i=0; i<1000; i++){
    
            await page.waitForSelector('#um_mail');
            const mailCount = await page.$eval('#um_mail', el => el.textContent.trim());
            const eventCount = await page.$eval('#um_events', el => el.textContent.trim());
    
            if (mailCount !== '0' || eventCount !== '0') {
            player.play('./mp3/level-up.mp3');
            }
    
            const stamElement = await page.waitForSelector('#um_stamina'); 
            const stamText = await page.evaluate(element => element.textContent.trim(), stamElement); 
            const stamValue = parseInt(stamText.replace('%', ''), 10);
    
            if (stamValue <= 65){
                await page.waitForSelector('.quickslot:nth-child(1) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(1) input:nth-child(1)');
            }
    
            const nerveElement = await page.waitForSelector('#um_nerve'); 
            const nerveText = await page.evaluate(element => element.textContent.trim(), nerveElement); 
            const nerveValue = parseInt(nerveText.split('/')[0], 10);
    
            if (nerveValue < 20){
                await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(3) input:nth-child(1)');
            }
    
            await page.waitForSelector('.siteMessage', { visible: true });
            const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
    
            try {
                if (messageText.includes('bribed your way out of isolation')) {
                    console.log(messageText);
                    await page.goto('https://www.prisonblock.com/crimes/steal-weapon');
                } else {
                    console.log(messageText);
              }
            } catch (error) {
              console.error("The siteMessage element was not found or another error occurred:", error);
            }
    
    
            await page.waitForSelector('.g-recaptcha', { visible: true });
            await page.click('.g-recaptcha'); 
        }
    
    })();
}

module.exports = southDakotaCrime;
