import fs from "fs";
import path from "path";
import https from "https";

import cards from "./src/cards.js";

// Folder to save images
const folder = './public/cardImages';

// Ensure folder exists
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
}

// Helper to download an image
function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(dest, () => {}); // Remove empty file
                return resolve(false); // Image not found
            }
            response.pipe(file);
            file.on('finish', () => file.close(resolve));
        }).on('error', (err) => {
            fs.unlink(dest, () => {}); // Delete failed download
            reject(err);
        });
    });
}

(async () => {
    for (const card of cards) {
        const id = card.id;
        const filePath = path.join(folder, `support_card_s_${id}.png`);
        
        // Check if file already exists
        if (fs.existsSync(filePath)) {
            console.log(`Image already exists for ID: ${id}`);
            continue;
        }

        // Download from remote URL
        const url = `https://gametora.com/images/umamusume/supports/support_card_s_${id}.png`;
        console.log(`Downloading ${url}...`);
        const success = await downloadImage(url, filePath);

        if (success === false) {
            console.log(`Image not found for ID: ${id}`);
        } else {
            console.log(`Saved image for ID: ${id}`);
        }
    }

    console.log("Done!");
})();
