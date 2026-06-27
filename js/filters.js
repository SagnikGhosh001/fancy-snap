const drawOriginalFilter = (left, top, rectW, rectH) => {
    if (video) {
        image(video, left, top, rectW, rectH);
    }
};

const drawGrayscaleFilter = (left, top, rectW, rectH) => {
    if (!video || !video.pixels || !video.pixels.length) return;

    video.loadPixels();

    noStroke();

    const step = 2;

    for (let y = 0; y < rectH; y += step) {
        for (let x = 0; x < rectW; x += step) {
            const sx = floor(map(left + x, 0, width, 0, video.width - 1));
            const sy = floor(map(top + y, 0, height, 0, video.height - 1));

            const index = (sx + sy * video.width) * 4;
            const r = video.pixels[index];
            const g = video.pixels[index + 1];
            const b = video.pixels[index + 2];
            const gray = (r + g + b) / 3;

            fill(gray);
            rect(left + x, top + y, step, step);
        }
    }
};

function drawASCII(left, top, rectW, rectH) {
    video.loadPixels();

    const step = 8;

    textAlign(LEFT, TOP);
    textSize(step);

    for (let sy = top; sy < top + rectH; sy += step) {
        for (let sx = left; sx < left + rectW; sx += step) {
            if (
                sx < 0 ||
                sy < 0 ||
                sx >= width ||
                sy >= height
            ) continue;

            const vx = floor(map(sx, 0, width, 0, video.width - 1));
            const vy = floor(map(sy, 0, height, 0, video.height - 1));

            const index = (vx + vy * video.width) * 4;

            const r = video.pixels[index];
            const g = video.pixels[index + 1];
            const b = video.pixels[index + 2];

            const brightness = (r + g + b) / 3;

            const charIndex = floor(
                map(brightness, 0, 255, 0, chars.length - 1),
            );

            fill(0);
            noStroke();
            rect(sx, sy, step, step);

            fill(255);
            text(chars[charIndex], sx, sy);
        }
    }
}

const drawPixelateFilter = (left, top, rectW, rectH) => {
    if (!video || !video.pixels || !video.pixels.length) return;

    video.loadPixels();

    const blockSize = 12;
    noStroke();

    for (let y = 0; y < rectH; y += blockSize) {
        for (let x = 0; x < rectW; x += blockSize) {
            const sx = floor(map(left + x, 0, width, 0, video.width - 1));
            const sy = floor(map(top + y, 0, height, 0, video.height - 1));

            const index = (sx + sy * video.width) * 4;
            const r = video.pixels[index];
            const g = video.pixels[index + 1];
            const b = video.pixels[index + 2];

            fill(r, g, b);
            rect(left + x, top + y, blockSize, blockSize);
        }
    }
};
