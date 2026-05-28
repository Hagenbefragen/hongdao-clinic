const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runTest() {
  console.log("Starting Puppeteer test...");
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Navigating to http://localhost:8080/");
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });

  const artifactDir = 'C:\\Users\\Hagen\\.gemini\\antigravity-ide\\brain\\096b607f-f837-4dee-bc40-48845abe84a3';

  console.log("Taking full page screenshot...");
  await page.screenshot({ path: path.join(artifactDir, 'screenshot_full.png'), fullPage: true });

  // Test TC-002: WeChat QR Code Modal
  console.log("Testing TC-002: WeChat QR Code Modal...");
  try {
    await page.evaluate(() => {
      const wechatLink = document.querySelector('a[data-article="wechat"]');
      if (wechatLink) wechatLink.click();
    });
    // Wait for the article modal to animate in and QR codes to load
    await new Promise(r => setTimeout(r, 1500));
    console.log("Taking WeChat modal screenshot...");
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_wechat_modal.png') });
    
    // Close the modal to prepare for next test
    await page.evaluate(() => {
      const closeBtn = document.querySelector('#article-modal-close');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
  } catch (e) {
    console.error("Error opening wechat modal:", e);
  }

  // Test TC-003: Apply Button Modal
  console.log("Testing TC-003: Apply Button Modal...");
  try {
    await page.evaluate(() => {
      // Find the "Jetzt bewerben" button in the Hero
      const applyBtn = document.querySelector('.hero .apply-trigger');
      if (applyBtn) applyBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    console.log("Taking apply modal screenshot...");
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_apply_modal.png') });
    
    // Close the modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('#booking-modal-close');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));
  } catch (e) {
    console.error("Error opening apply modal:", e);
  }

  await browser.close();
  console.log("Test completed.");
}

runTest().catch(console.error);
