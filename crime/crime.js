const puppeteer = require('puppeteer');
const fs = require("fs");
const player = require('play-sound')(opts = {});

let initialTime = new Date();

function crime(nerve, stam, iso, icu, prison){
    (async () => {
        const browser = await puppeteer.launch({ 
          headless: false, 
          defaultViewport: false,
          userDataDir: "./tmp", 
        });
    
        const page = await browser.newPage();
        const client = await page.target().createCDPSession();
    
        await page.goto(`https://www.prisonblock.com/crimes/${prison}`);

        await page.waitForSelector('.g-recaptcha', { visible: true });
        await page.click('.g-recaptcha'); 
    
        for (var i=0; i<10000; i++){

            let currentTime = new Date();
            const timeDifference = (currentTime - initialTime) / (1000 * 60);

            if (timeDifference >= 0.35) {
                const cookies = await client.send('Network.getAllCookies');
                const keepCookies = ['pbpid', 'lastuser'];
                const cookiesToKeep = cookies.cookies.filter(cookie => 
                    keepCookies.includes(cookie.name) && cookie.domain.includes('prisonblock.com')
                );
                await client.send('Network.clearBrowserCookies');
                for (let cookie of cookiesToKeep) {
                    await client.send('Network.setCookie', cookie);
                }
                console.log("Cookie updated :)"); 
                initialTime = new Date();
                await page.goto(`https://www.prisonblock.com/crimes/${prison}`);
                await page.waitForSelector('.g-recaptcha', { visible: true });
                await page.click('.g-recaptcha'); 
            }

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
    
            if (nerveValue < nerve && nerveValue !== 1){
                await page.waitForSelector('.quickslot:nth-child(2) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(2) input:nth-child(1)');
            }

            if(iso){
                await page.waitForSelector('.siteMessage', { visible: true });
                const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
        
                try {
                    if (messageText.includes('bribed your way out of isolation') || messageText.includes(`uard caught you smokin`)) {
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

            await page.waitForSelector('.siteMessage', { visible: true });
            const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
    
            try {
                if (messageText.includes('bribed your way out of isolation') || messageText.includes('usted a guard') || messageText.includes('re in isolation for an')) {
                    console.log(messageText);
                    await page.waitForSelector('.menu');
                    await page.goto(`https://www.prisonblock.com/crimes/${prison}`);
                    await page.waitForSelector('.g-recaptcha', { visible: true });
                    await page.click('.g-recaptcha'); 
                } else {
                    console.log(messageText);
            }
            } catch (error) {
            console.error("The siteMessage element was not found or another error occurred:", error);
            }

            
        }
    
    })();
}

module.exports = crime;
