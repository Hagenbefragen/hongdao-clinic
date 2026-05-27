const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = 'C:\\Users\\Hagen\\.gemini\\antigravity-ide\\browser_recordings';

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runTests() {
  console.log('Starting E2E Validation for HongDao Clinic & VERA apps...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Disable cache to ensure fresh assets are tested
  await page.setCacheEnabled(false);
  
  // Forward browser console logs and errors
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  page.on('requestfailed', req => console.log('REQUEST FAILED:', req.url(), req.failure() ? req.failure().errorText : ''));
  page.on('response', res => {
    if (res.status() >= 400) {
      console.log('HTTP ERROR:', res.status(), res.url());
    }
  });

  // Set viewport for consistent screenshots
  await page.setViewport({ width: 1280, height: 800 });

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const results = [];

  try {
    // ----------------------------------------------------
    // TEST 1: HongDao Clinic Index Page
    // ----------------------------------------------------
    console.log('\n--- Testing index.html (HongDao Clinic) ---');
    await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle2' });
    
    // Check footer
    const footerText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });

    console.log('Footer Text:', footerText);
    const hasLebensflussIndex = footerText && footerText.includes('Lebensfluss e.V.');
    console.log('Is Lebensfluss e.V. in index footer?', hasLebensflussIndex);

    // Save main screenshot
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_hongdao_index.png') });
    console.log('Saved 01_hongdao_index.png');

    // Click Impressum link
    let hasLLCInModal = false;
    const impressumBtn = await page.$('a[data-article="impressum"]');
    if (impressumBtn) {
      await impressumBtn.click();
      await sleep(1000); // Wait for modal animation
      
      hasLLCInModal = await page.evaluate(() => {
        const modalBody = document.getElementById('article-modal-body');
        console.log('MODAL BODY INNER TEXT:', modalBody ? modalBody.innerText : 'null');
        return modalBody && modalBody.innerText.includes('Solvea Biosciences Laboratory LLC');
      });
      console.log('Is Solvea Biosciences Laboratory LLC in Impressum modal?', hasLLCInModal);

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_hongdao_impressum_modal.png') });
      console.log('Saved 02_hongdao_impressum_modal.png');
      
      // Close modal (click close button or escape/overlay)
      const closeBtn = await page.$('.modal .close-btn, .modal-close');
      if (closeBtn) await closeBtn.click();
      else {
        // Fallback reload to clear modal state
        await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle2' });
      }
    } else {
      console.warn('Could not find Impressum button with data-article="impressum"');
    }

    // Click Datenschutz link
    const privacyBtn = await page.$('a[data-article="privacy"]');
    if (privacyBtn) {
      await privacyBtn.click();
      await sleep(1000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_hongdao_datenschutz_modal.png') });
      console.log('Saved 03_hongdao_datenschutz_modal.png');
    } else {
      console.warn('Could not find Datenschutz button with data-article="privacy"');
    }

    results.push({
      page: 'HongDao Clinic Index',
      status: 'SUCCESS',
      legalAligned: hasLLCInModal
    });

    // ----------------------------------------------------
    // TEST 2: VeraTongue Page
    // ----------------------------------------------------
    console.log('\n--- Testing veratongue.html ---');
    await page.goto('http://localhost:8080/vera/veratongue.html', { waitUntil: 'networkidle2' });

    // Check footer
    const vtFooterText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });
    console.log('VeraTongue Footer Text:', vtFooterText);
    const hasZVRZahl = vtFooterText && vtFooterText.includes('1758759096');
    const hasLebensflussVT = vtFooterText && vtFooterText.includes('Lebensfluss e.V.');
    console.log('Has ZVR-Zahl?', hasZVRZahl);
    console.log('Has Lebensfluss e.V.?', hasLebensflussVT);

    // Capture page view
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_veratongue_landing.png') });
    console.log('Saved 04_veratongue_landing.png');

    // Trigger download modal
    const vtJoinBtn = await page.$('a[href="#join"]');
    if (vtJoinBtn) {
      await vtJoinBtn.click();
      await sleep(1000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_veratongue_download_modal.png') });
      console.log('Saved 05_veratongue_download_modal.png');

      // Check APK download link
      const apkLink = await page.evaluate(() => {
        const btn = document.getElementById('apk-download-btn');
        return btn ? btn.getAttribute('href') : null;
      });
      console.log('VeraTongue APK Download Link:', apkLink);
      const isRelativeVT = apkLink === './VeraTongue.apk';
      console.log('Is relative APK path correct?', isRelativeVT);

      results.push({
        page: 'VeraTongue',
        status: 'SUCCESS',
        legalAligned: hasZVRZahl && hasLebensflussVT,
        apkPathCorrect: isRelativeVT
      });
    } else {
      console.warn('Could not find button with href="#join" on VeraTongue page');
      results.push({
        page: 'VeraTongue',
        status: 'WARNING',
        details: 'Join button not found'
      });
    }

    // ----------------------------------------------------
    // TEST 3: VeraIris Page
    // ----------------------------------------------------
    console.log('\n--- Testing verairis.html ---');
    await page.goto('http://localhost:8080/vera/verairis.html', { waitUntil: 'networkidle2' });

    const viFooterText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });
    console.log('VeraIris Footer:', viFooterText);
    const hasZVR_VI = viFooterText && viFooterText.includes('1758759096');
    const hasLebensfluss_VI = viFooterText && viFooterText.includes('Lebensfluss e.V.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_verairis_landing.png') });
    console.log('Saved 06_verairis_landing.png');

    const viApkLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[download]')).map(a => a.getAttribute('href'));
    });
    console.log('VeraIris Download links:', viApkLinks);
    const isApkPathCorrect_VI = viApkLinks.every(href => href === './VeraIris.apk' || href === 'VeraIris.apk');

    results.push({
      page: 'VeraIris',
      status: 'SUCCESS',
      legalAligned: hasZVR_VI && hasLebensfluss_VI,
      apkPathCorrect: isApkPathCorrect_VI
    });

    // ----------------------------------------------------
    // TEST 4: VeraCordis Page
    // ----------------------------------------------------
    console.log('\n--- Testing veracordis.html ---');
    await page.goto('http://localhost:8080/vera/veracordis.html', { waitUntil: 'networkidle2' });

    const vcFooterText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });
    console.log('VeraCordis Footer:', vcFooterText);
    const hasZVR_VC = vcFooterText && vcFooterText.includes('1758759096');
    const hasLebensfluss_VC = vcFooterText && vcFooterText.includes('Lebensfluss e.V.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_veracordis_landing.png') });
    console.log('Saved 07_veracordis_landing.png');

    const vcApkLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[download]')).map(a => a.getAttribute('href'));
    });
    console.log('VeraCordis Download links:', vcApkLinks);
    const isApkPathCorrect_VC = vcApkLinks.every(href => href === './VeraCordis.apk' || href === 'VeraCordis.apk');

    results.push({
      page: 'VeraCordis',
      status: 'SUCCESS',
      legalAligned: hasZVR_VC && hasLebensfluss_VC,
      apkPathCorrect: isApkPathCorrect_VC
    });

    // ----------------------------------------------------
    // TEST 5: VeraFocus Page
    // ----------------------------------------------------
    console.log('\n--- Testing verafocus.html ---');
    await page.goto('http://localhost:8080/vera/verafocus.html', { waitUntil: 'networkidle2' });

    const vfFooterText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });
    console.log('VeraFocus Footer:', vfFooterText);
    const hasZVR_VF = vfFooterText && vfFooterText.includes('1758759096');
    const hasLebensfluss_VF = vfFooterText && vfFooterText.includes('Lebensfluss e.V.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_verafocus_landing.png') });
    console.log('Saved 08_verafocus_landing.png');

    const vfApkLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[download]')).map(a => a.getAttribute('href'));
    });
    console.log('VeraFocus Download links:', vfApkLinks);
    const isApkPathCorrect_VF = vfApkLinks.every(href => href === './VeraFocus.apk' || href === 'VeraFocus.apk');

    results.push({
      page: 'VeraFocus',
      status: 'SUCCESS',
      legalAligned: hasZVR_VF && hasLebensfluss_VF,
      apkPathCorrect: isApkPathCorrect_VF
    });

    // ----------------------------------------------------
    // TEST 6: VeraVox Page
    // ----------------------------------------------------
    console.log('\n--- Testing veravox.html ---');
    await page.goto('http://localhost:8080/vera/veravox.html', { waitUntil: 'networkidle2' });

    const vvFooterText = await page.evaluate(() => {
      const footer = document.querySelector('footer');
      return footer ? footer.innerText : null;
    });
    console.log('VeraVox Footer:', vvFooterText);
    const hasZVR_VV = vvFooterText && vvFooterText.includes('1758759096');
    const hasLebensfluss_VV = vvFooterText && vvFooterText.includes('Lebensfluss e.V.');

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_veravox_landing.png') });
    console.log('Saved 09_veravox_landing.png');

    const vvApkLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[download]')).map(a => a.getAttribute('href'));
    });
    console.log('VeraVox Download links:', vvApkLinks);
    const isApkPathCorrect_VV = vvApkLinks.every(href => href === './VeraVox.apk' || href === 'VeraVox.apk');

    results.push({
      page: 'VeraVox',
      status: 'SUCCESS',
      legalAligned: hasZVR_VV && hasLebensfluss_VV,
      apkPathCorrect: isApkPathCorrect_VV
    });

  } catch (err) {
    console.error('Validation failed with error:', err);
    results.push({
      page: 'Global Run',
      status: 'FAILED',
      error: err.message
    });
  } finally {
    await browser.close();
    console.log('\n======================================');
    console.log('E2E Validation Results:');
    console.log(JSON.stringify(results, null, 2));
    console.log('======================================');
  }
}

runTests();
