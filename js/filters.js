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

const drawThermalFilter = (left, top, rectW, rectH) => {
    if (!video || !video.pixels || !video.pixels.length) return;

    video.loadPixels();

    const step = 2;
    noStroke();

    for (let y = 0; y < rectH; y += step) {
        for (let x = 0; x < rectW; x += step) {
            const sx = floor(map(left + x, 0, width, 0, video.width - 1));
            const sy = floor(map(top + y, 0, height, 0, video.height - 1));

            const index = (sx + sy * video.width) * 4;

            const r = video.pixels[index];
            const g = video.pixels[index + 1];
            const b = video.pixels[index + 2];

            const brightness = (r + g + b) / 3;

            let tr, tg, tb;

            if (brightness < 64) {
                tr = 0;
                tg = 0;
                tb = map(brightness, 0, 64, 80, 255);
            } else if (brightness < 128) {
                tr = 0;
                tg = map(brightness, 64, 128, 0, 255);
                tb = 255;
            } else if (brightness < 192) {
                tr = map(brightness, 128, 192, 0, 255);
                tg = 255;
                tb = map(brightness, 128, 192, 255, 0);
            } else {
                tr = 255;
                tg = map(brightness, 192, 255, 255, 0);
                tb = 0;
            }

            fill(tr, tg, tb);
            rect(left + x, top + y, step, step);
        }
    }
};

const drawNeonEdgeFilter = (left, top, rectW, rectH) => {
    if (!video || !video.pixels || !video.pixels.length) return;

    video.loadPixels();

    const step = 3;
    noStroke();
    fill(0);
    rect(left, top, rectW, rectH);

    const getBrightness = (sx, sy) => {
        sx = constrain(sx, 0, video.width - 1);
        sy = constrain(sy, 0, video.height - 1);
        const i = (sx + sy * video.width) * 4;
        return (video.pixels[i] + video.pixels[i + 1] + video.pixels[i + 2]) /
            3;
    };

    for (let y = 0; y < rectH; y += step) {
        for (let x = 0; x < rectW; x += step) {
            const sx = floor(map(left + x, 0, width, 0, video.width - 1));
            const sy = floor(map(top + y, 0, height, 0, video.height - 1));

            const gx = getBrightness(sx + 1, sy) - getBrightness(sx - 1, sy);
            const gy = getBrightness(sx, sy + 1) - getBrightness(sx, sy - 1);

            const edge = sqrt(gx * gx + gy * gy);

            if (edge > 25) {
                const hueShift = map(edge, 25, 255, 140, 320);
                colorMode(HSB, 360, 100, 100);
                fill(hueShift, 90, 100);
                colorMode(RGB, 255);
                rect(left + x, top + y, step, step);
            }
        }
    }
};

const drawKaleidoscopeFilter = (left, top, rectW, rectH) => {
    if (!video || !video.pixels || !video.pixels.length) return;

    video.loadPixels();

    const step = 3;
    const cx = left + rectW / 2;
    const cy = top + rectH / 2;
    const slices = 6;
    const sliceAngle = TWO_PI / slices;

    noStroke();

    for (let y = 0; y < rectH; y += step) {
        for (let x = 0; x < rectW; x += step) {
            const dx = (left + x) - cx;
            const dy = (top + y) - cy;

            let angle = atan2(dy, dx);
            const radius = sqrt(dx * dx + dy * dy);

            angle = ((angle % sliceAngle) + sliceAngle) % sliceAngle;
            if (floor((atan2(dy, dx) + PI) / sliceAngle) % 2 === 0) {
                angle = sliceAngle - angle;
            }

            const sampleX = cx + cos(angle) * radius;
            const sampleY = cy + sin(angle) * radius;

            const sx = constrain(
                floor(map(sampleX, 0, width, 0, video.width - 1)),
                0,
                video.width - 1,
            );
            const sy = constrain(
                floor(map(sampleY, 0, height, 0, video.height - 1)),
                0,
                video.height - 1,
            );

            const index = (sx + sy * video.width) * 4;
            fill(
                video.pixels[index],
                video.pixels[index + 1],
                video.pixels[index + 2],
            );

            rect(left + x, top + y, step, step);
        }
    }
};
