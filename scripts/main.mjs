import fs from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto('https://rsduff.github.io/desn3035-e5/');
// Set screen size.
await page.setViewport({width: 1080, height: 1024});
//puppeteer let me know when your done with loading everything inside your broswer.
await page.waitForNetworkIdle();
await page.screenshot({path: "auto_screenshot.png"});

const options = {output: 'html'};
const runnerResult = await lighthouse('https://rsduff.github.io/desn3035-e5/', options, undefined, page);

// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync('auto_report.html', reportHtml);

await browser.close();