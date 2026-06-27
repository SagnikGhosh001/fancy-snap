const setupCamera = () => {
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();

    hands = new Hands({
        locateFile: (file) =>
            `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`,
    });

    hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
        landmarks = results.multiHandLandmarks || [];
    });
};

const processCamera = () => {
    image(video, 0, 0, width, height);

    if (video.elt.readyState >= 2 && !isProcessing) {
        isProcessing = true;

        hands.send({
            image: video.elt,
        }).finally(() => {
            isProcessing = false;
        });
    }
};
