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

  // Test QR codes modal (WeChat)
  console.log("Looking for WeChat contact button...");
  // Need to find the button that triggers the wechat modal.
  // In index.html, there are buttons with classes or onclick events. Let's find any button that opens a modal.
  // Or just execute the global function `openModal('wechatModal')` if it exists.
  try {
    await page.evaluate(() => {
      if (typeof openModal === 'function') {
        openModal('wechatModal');
      } else {
        // Fallback: try to click a button that contains WeChat
        const buttons = Array.from(document.querySelectorAll('button, a'));
        const wechatBtn = buttons.find(b => b.textContent.includes('WeChat'));
        if (wechatBtn) wechatBtn.click();
      }
    });
    // Wait a bit for modal to animate
    await new Promise(r => setTimeout(r, 500));
    console.log("Taking modal screenshot...");
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_wechat_modal.png') });
  } catch (e) {
    console.error("Error opening wechat modal:", e);
  }

  // Test WhatsApp
  try {
    await page.evaluate(() => {
      if (typeof openModal === 'function') {
        openModal('whatsappModal');
      }
    });
    await new Promise(r => setTimeout(r, 500));
    console.log("Taking whatsapp modal screenshot...");
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_whatsapp_modal.png') });
  } catch (e) {
    console.error("Error opening whatsapp modal:", e);
  }

  // Test "Profil lesen" modal
  try {
    await page.evaluate(() => {
      if (typeof openModal === 'function') {
        openModal('profileModal');
      }
    });
    await new Promise(r => setTimeout(r, 500));
    console.log("Taking profile modal screenshot...");
    await page.screenshot({ path: path.join(artifactDir, 'screenshot_profile_modal.png') });
  } catch (e) {
    console.error("Error opening profile modal:", e);
  }

  await browser.close();
  console.log("Test completed.");
}

runTest().catch(console.error);
