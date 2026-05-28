const QRCode = require('qrcode');
const path = require('path');

const urlPersonal = "https://u.wechat.com/EKrXuMndtBkOgA4VDjFYiuY?s=2";
const urlClinic = "https://weixin.qq.com/q/022Br2ArHVfrJ10000M07T";

const run = async () => {
    try {
        await QRCode.toFile(path.join(__dirname, 'images', 'wechat_personal.png'), urlPersonal, { width: 400, margin: 2, color: { dark: '#b34726', light: '#fbf9f6' } });
        await QRCode.toFile(path.join(__dirname, 'images', 'wechat_clinic.png'), urlClinic, { width: 400, margin: 2, color: { dark: '#b34726', light: '#fbf9f6' } });
        console.log("QR Codes generated successfully.");
    } catch (e) {
        console.error("Error generating QR Codes", e);
    }
};

run();
