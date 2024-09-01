const puppeteer = require('puppeteer');
const fs = require("fs");
const player = require('play-sound')(opts = {});

const inmates = ['Jbunnz', 'MASHUP', 'HeartBreaker831', 'Slumpz', 'Chilla', 'BigWheel', 'Sun_Tzu', 
    'JazzieDaGrinch', 'Spinelli', 'Incognita', 'andy20', 'bigb2146', 'HEAT_FINDER_98', 'lboogie',
    'Nulltag', '0_Shannon_0', 'TONYMONGUIDOJr', 'neo88', 'Caissa', 'roxy', 'RoosterCogburn', 
    'rog_', 'heffoblaze420', 'Nemalm', 'dayna', 'jrahDaBully', 'TurboTorture'];

async function mug(){
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: false,
        userDataDir: "../tmp", 
    });

    console.log(new Date(Date.now()).toLocaleString());

    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    

    for (var i=0; i<inmates.length; i++){

        const cookies = await client.send('Network.getAllCookies');
        const keepCookies = ['pbpid', 'lastuser'];
        const cookiesToKeep = cookies.cookies.filter(cookie => 
            keepCookies.includes(cookie.name) && cookie.domain.includes('prisonblock.com')
        );
        await client.send('Network.clearBrowserCookies');
        for (let cookie of cookiesToKeep) {
            await client.send('Network.setCookie', cookie);
        }

        await page.goto(`https://www.prisonblock.com/profile/${inmates[i]}`);

        let stamElement = await page.waitForSelector('#um_stamina'); 
        let stamText = await page.evaluate(element => element.textContent.trim(), stamElement); 
        let stamValue = parseInt(stamText.replace('%', ''), 10);

        while (stamValue < 100){
            await new Promise(resolve => setTimeout(resolve, 200));
            await page.waitForSelector('.quickslot:nth-child(1) input:nth-child(1)', { visible: true });
            await page.click('.quickslot:nth-child(1) input:nth-child(1)');
            stamElement = await page.waitForSelector('#um_stamina'); 
            stamText = await page.evaluate(element => element.textContent.trim(), stamElement); 
            stamValue = parseInt(stamText.replace('%', ''), 10);
        }

        await page.waitForSelector('.mug', { visible: true });
        await page.click('.mug');
    }    
    await browser.close(); 
}

setInterval(mug, 630000);

mug();

module.exports = mug;
