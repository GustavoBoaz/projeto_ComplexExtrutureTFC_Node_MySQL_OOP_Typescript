const puppeteer = require('puppeteer');

let browser;

const initBrowser = async () => {
  browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--window-size=1920,1080',
    ],
    headless: false,
  });
  const page = await browser.newPage();

  return page;
};

const termBrowser = async () => browser.close();

module.exports = {
  initBrowser,
  termBrowser,
};
