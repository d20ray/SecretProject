const puppeteer = require('puppeteer-extra');
const fs = require("fs");

const inmates = ['AvengerNKJ', 'DR_FiSh', 'bigboss1', 'V12DaBully', 'pistol22',  'Slumpz', 'Jbunnz', 'MASHUP', 'HeartBreaker831', 'Slumpz', 'Chilla', 'BigWheel', 'Sun_Tzu', 
    'JazzieDaGrinch', 'Spinelli', 'Incognita'];

let initialTime = new Date();
let options = { hour: 'numeric', minute: 'numeric', hour12: true };
const chalk = require('chalk');

async function mug(page, client) {

    await page.goto(`https://www.prisonblock.com/`);
    let nerveElement = await page.waitForSelector('#um_nerve');
    let nerveText = await page.evaluate(element => element.textContent.trim(), nerveElement);
    let nerveValue = parseInt(nerveText.split('/')[0], 10);

    initialTime = new Date();

    if (nerveValue >= 100) {
        for (let i = 0; i < inmates.length; i++) {

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

            let energyElement = await page.waitForSelector('#um_energy');
            let energyText = await page.evaluate(element => element.textContent.trim(), energyElement);
            let energyValue = parseInt(energyText.split('/')[0], 10);

            if (energyValue < 60 && energyValue != 1 && energyValue != 2) {
                await new Promise(resolve => setTimeout(resolve, 200));
                await page.waitForSelector('.quickslot:nth-child(2) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(2) input:nth-child(1)');
                try {
                    await page.waitForSelector('.siteMessage', { visible: true });
                    const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());

                    if (messageText.includes('You can not use items') || messageText.includes('You nearly have a stroke')) {
                        console.log(messageText);
                        await page.goto('https://www.prisonblock.com/icu');
                        await page.waitForSelector('.g-recaptcha', { visible: true });
                        await page.click('.g-recaptcha'); 
                        await page.waitForSelector('.menu');
                        await page.goto(`https://www.prisonblock.com/profile/${inmates[i]}`);
                    } else {
                        console.log(messageText);
                    }
                } catch (error) {
                    console.error("The siteMessage element was not found or another error occurred:", error);
                }
            }

            let stamElement = await page.waitForSelector('#um_stamina');
            let stamText = await page.evaluate(element => element.textContent.trim(), stamElement);
            let stamValue = parseInt(stamText.replace('%', ''), 10);

            while (stamValue < 100) {
                await new Promise(resolve => setTimeout(resolve, 200));
                await page.waitForSelector('.quickslot:nth-child(1) input:nth-child(1)', { visible: true });
                await page.click('.quickslot:nth-child(1) input:nth-child(1)');
                stamElement = await page.waitForSelector('#um_stamina');
                stamText = await page.evaluate(element => element.textContent.trim(), stamElement);
                stamValue = parseInt(stamText.replace('%', ''), 10);
            }
            await page.waitForSelector('.mug', { visible: true });
            await page.click('.mug');
            await page.waitForSelector('.siteMessage', { visible: true });
            const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());
            console.log(chalk.bgMagenta(messageText));
        }
    } 
    await page.goto('https://www.prisonblock.com/gym');
    await page.waitForSelector(`form:nth-child(5) .widebutton`, { visible: true });
    await page.click(`form:nth-child(5) .widebutton`);
}

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pause(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

async function redbullLargeWaterLogic(browser) {
    const page = await browser.newPage();

    await page.goto('https://www.prisonblock.com/gym');
    const times = 10000;

    const client = await page.target().createCDPSession();

    await mug(page, client);

    let startTime = new Date();
    let lastBreak = new Date();
    let delay = 0;

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

        // await page.waitForSelector('#um_mail');
        // const mailCount = await page.$eval('#um_mail', el => el.textContent.trim());
        // const eventCount = await page.$eval('#um_events', el => el.textContent.trim());

        // if (mailCount !== '0' || eventCount !== '0') {
        //     player.play('./mp3/level-up.mp3');
        // }

        // let chance = Math.floor(Math.random() * 4); 
        // if (chance === 0) {
        //     const delay = Math.random() * (8000 - 3000) + 3000;
        //     console.log(chalk.blue('Taking a ' , (delay/1000).toFixed(2), ' second pause'));
        //     await new Promise(resolve => setTimeout(resolve, delay));
        // }

        // chance = Math.floor(Math.random() * 200);
        // if (chance === 0) {
        //   delay = ((Math.random() * 10) + 8) * 60000; // Convert minutes to milliseconds
        //   lastBreak = new Date();
        //   lastBreak.setHours(lastBreak.getHours());
        //   console.log(chalk.magenta('Taking a ', (delay / 60000).toFixed(2), 'minute break at ', lastBreak.toLocaleTimeString('en-US', options)));
        //   await new Promise(resolve => setTimeout(resolve, delay)); // Wait during the break
        // }

        // console.log(chalk.green('Last break was at: ', lastBreak.toLocaleTimeString('en-US', options), 'for ', (delay / 60000).toFixed(2), ' minutes'));

        await page.waitForSelector('.quickslot:nth-child(2) input:nth-child(1)', { visible: true });
        await page.click('.quickslot:nth-child(2) input:nth-child(1)');

        try {
            await page.waitForSelector('.siteMessage', { visible: true });
            const messageText = await page.$eval('.siteMessage', el => el.textContent.trim());

            if (messageText.includes('You can not use items') || messageText.includes("You can't handle this raw shit!") || messageText.includes('You nearly have a stroke') || messageText.includes('Lightweight! This shit is too much for you!')) {
                console.log(messageText);
                await page.goto('https://www.prisonblock.com/icu');
                await page.waitForSelector('.g-recaptcha', { visible: true });
                await page.click('.g-recaptcha'); 
                await page.waitForSelector('.menu');
                await page.goto('https://www.prisonblock.com/gym');
            } else {
                console.log(chalk.red(messageText));
            }
        } catch (error) {
            console.error("The siteMessage element was not found or another error occurred:", error);
        }

        await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
        await page.click('.quickslot:nth-child(3) input:nth-child(1)');

        await page.waitForSelector('.quickslot:nth-child(3) input:nth-child(1)', { visible: true });
        await page.click('.quickslot:nth-child(3) input:nth-child(1)');

        await page.waitForSelector(`form:nth-child(5) .widebutton`, { visible: true });
        await page.click(`form:nth-child(5) .widebutton`);

        let currentTime = new Date();
        const timeDifference = (currentTime - initialTime) / (1000 * 60);
        console.log(chalk.cyan('Time since last mug: ', timeDifference.toFixed(2), 'minutes'));

        if (timeDifference >= 10.5) {
            await mug(page, client); 
        }
    }
    await page.close(); 
}

async function startBots() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
    });

    await redbullLargeWaterLogic(browser);
    await browser.close(); 
}

startBots();
