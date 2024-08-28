const puppeteer = require('puppeteer');
const fs = require("fs");
const player = require('play-sound')(opts = {});

function crime(nerve, stam, iso, icu, prison){
    (async () => {
        const browser = await puppeteer.launch({ 
          headless: false, 
          defaultViewport: false,
          userDataDir: "./tmp", 
        });
    
        const page = await browser.newPage();
    
        await page.goto(`https://www.prisonblock.com/crimes/${prison}`);

        await page.waitForSelector('.g-recaptcha', { visible: true });
        await page.click('.g-recaptcha'); 
    
        for (var i=0; i<1000; i++){
    
            await page.waitForSelector('#um_mail');
            const mailCount = await page.$eval('#um_mail', el => el.textContent.trim());
            const eventCount = await page.$eval('#um_events', el => el.textContent.trim());
    
            if (mailCount !== '0' || eventCount !== '0') {
            player.play('./mp3/level-up.mp3');
            }

            if (stam != 0){
                const stamElement = await page.waitForSelector('#um_stamina'); 
                const stamText = await page.evaluate(element => element.textContent.trim(), stamElement); 
                const stamValue = parseInt(stamText.replace('%', ''), 10);
        
                if (stamValue <= stam){
                    await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
                    await page.click('.quickslot:nth-child(3) input:nth-child(1)');
                }
            }
    
            const nerveElement = await page.waitForSelector('#um_nerve'); 
            const nerveText = await page.evaluate(element => element.textContent.trim(), nerveElement); 
            const nerveValue = parseInt(nerveText.split('/')[0], 10);
    
            if (nerveValue < nerve){
                await page.waitForSelector('.quickslot:nth-child(2) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(2) input:nth-child(1)');
            }

            if(iso){
                await page.waitForSelector('.siteMessage', { visible: true });
                const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
        
                try {
                    if (messageText.includes('bribed your way out of isolation')) {
                        console.log(messageText);
                        await page.waitForSelector('.menu');
                        await page.goto(`https://www.prisonblock.com/crimes/${prison}`);
                    } else {
                        console.log(messageText);
                }
                } catch (error) {
                console.error("The siteMessage element was not found or another error occurred:", error);
                }
            }

            if(icu){
                try {
                    await page.waitForSelector('.siteMessage', { visible: true });
                    const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
                  
                    if (messageText.includes('You can not use items') || messageText.includes('eight! This shit is too much for you')) {
                      console.log(messageText);
                      await page.goto('https://www.prisonblock.com/icu');
                      await page.waitForSelector('.g-recaptcha', { visible: true });
                      await page.click('.g-recaptcha'); 
                      await page.waitForSelector('.menu');
                      await page.goto(`https://www.prisonblock.com/crimes/${prison}`);
                    } else {
                      console.log(messageText);
                    }
                  } catch (error) {
                    console.error("The siteMessage element was not found or another error occurred:", error);
                  }
            }
    
            await page.waitForSelector('.g-recaptcha', { visible: true });
            await page.click('.g-recaptcha'); 
        }
    
    })();
}

module.exports = crime;
