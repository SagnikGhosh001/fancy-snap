function setup() {
    createCanvas(windowWidth, windowHeight);
    setupCamera();
}

const drawFilterUI = () => {
    push();

    textAlign(CENTER, TOP);
    textSize(22);
    fill("black");
    noStroke();
    text(`Current filter: ${currentFilter}`, width / 2, 16);

    fill(255);
    rect(10, 10, 260, 130, 10);

    fill(0);
    textAlign(LEFT, TOP);
    textSize(16);
    text("click button to change", 36, 15);
    text("1 -> original", 36, 38);
    text("2 -> grayscale", 36, 60);
    text("3 -> ascii", 36, 82);
    text("4 -> pixelate", 36, 104);

    pop();
};

function draw() {
    background(0);

    push();
    translate(width, 0);
    scale(-1, 1);

    processCamera();
    drawFingerRectangle();
    pop();
    drawFilterUI();
}

function keyPressed() {
    if (key === "1") {
        currentFilter = FILTERS.ORIGINAL;
    } else if (key === "2") {
        currentFilter = FILTERS.GRAYSCALE;
    } else if (key === "3") {
        currentFilter = FILTERS.ASCII;
    } else if (key === "4") {
        currentFilter = FILTERS.PIXELATE;
    }

    return false;
}
