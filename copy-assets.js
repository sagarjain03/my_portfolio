const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\HP\\.gemini\\antigravity\\brain\\9b3bf89b-a11c-4f29-b057-e04248264080';
const destDir = 'd:\\Antigravity_portfolio\\public\\images';

const files = [
    'solo_leveling_wallpaper_1765382853016.png',
    'sun_jin_woo_character_1765382885947.png'
];

const targets = [
    'solo_wallpaper.png',
    'sun_jin_woo.png'
];

files.forEach((file, index) => {
    const src = path.join(sourceDir, file);
    const dest = path.join(destDir, targets[index]);

    try {
        fs.copyFileSync(src, dest);
        fs.appendFileSync('copy_log.txt', `Success: Copied ${src} to ${dest}\n`);
    } catch (err) {
        fs.appendFileSync('copy_log.txt', `Error: Failed to copy ${src} -> ${dest}. Details: ${err.message}\n`);
    }
});
