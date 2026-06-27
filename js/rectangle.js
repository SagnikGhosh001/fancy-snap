const drawFilters = (left, top, rectW, rectH) => {
    switch (currentFilter) {
        case FILTERS.ORIGINAL:
            drawOriginalFilter(left, top, rectW, rectH);
            break;
        case FILTERS.GRAYSCALE:
            drawGrayscaleFilter(left, top, rectW, rectH);
            break;
        case FILTERS.ASCII:
            drawASCII(left, top, rectW, rectH);
            break;
        case FILTERS.PIXELATE:
            drawPixelateFilter(left, top, rectW, rectH);
            break;
        default:
            drawOriginalFilter(left, top, rectW, rectH);
            break;
    }
};

const drawFingerRectangle = () => {
    if (landmarks.length < 2) return;

    const leftFinger = landmarks[0][8];
    const rightFinger = landmarks[1][8];

    const x1 = leftFinger.x * width;
    const y1 = leftFinger.y * height;

    const x2 = rightFinger.x * width;
    const y2 = rightFinger.y * height;

    const rectW = dist(x1, y1, x2, y2);
    const rectH = Math.abs(y1 - y2);

    const left = (x1 + x2) / 2 - rectW / 2;
    const top = (y1 + y2) / 2 - rectH / 2;

    drawFilters(left, top, rectW, rectH);

    noFill();
    stroke(0, 255, 0);
    strokeWeight(3);
    rect(left, top, rectW, rectH);
};
