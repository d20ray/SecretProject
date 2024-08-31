const puppeteer = require('puppeteer');
const fs = require("fs");
const player = require('play-sound')(opts = {});

const inmates = ['Jbunnz', 'MASHUP', 'HeartBreaker831', 'Chilla', 'BigWheel', 'Sun_Tzu', 
    'JazzieDaGrinch', 'Spinelli', 'Incognita', 'andy20', 'bigb2146', 'HEAT_FINDER_98', 'lboogie',
    'Nulltag', '0_Shannon_0', 'TONYMONGUIDOJr', 'neo88', 'Caissa', 'roxy', 'RoosterCogburn', 
    'rog_', 'heffoblaze420', 'Nemalm', 'dayna', 'jrahDaBully', 'TurboTorture'];

async function mug(){
    const browser = await puppeteer.launch({ 
        headless: false, 
        defaultViewport: false,
        userDataDir: "../tmp", 
    });

    const page = await browser.newPage();

    for (var i=0; i<inmates.length; i++){

        await page.goto(`https://www.prisonblock.com/profile/${inmates[i]}`);

        let stamElement = await page.waitForSelector('#um_stamina'); 
        let stamText = await page.evaluate(element => element.textContent.trim(), stamElement); 
        let stamValue = parseInt(stamText.replace('%', ''), 10);

        while (stamValue < 100){
            await new Promise(resolve => setTimeout(resolve, 500));
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
