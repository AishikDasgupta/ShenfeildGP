const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {  
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const file = 'file:///' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');
  for (const width of [375, 320]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 812, deviceScaleFactor: 2 });
    await page.goto(file, { waitUntil: 'networkidle0', timeout: 60000 });
    const data = await page.evaluate(() => {
      const out = { docScroll: document.documentElement.scrollWidth };
      const nav = document.querySelector('.nav-inner');
      if (nav) {
        out.navClient = nav.clientWidth;
        out.navScroll = nav.scrollWidth;
        out.kids = [...nav.children].map(el => ({
          cls: el.className.toString(),
          w: Math.round(el.getBoundingClientRect().width),
        }));
      }
      return out;
    });
    console.log(`viewport ${width}:`, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
