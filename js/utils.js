const fingerPosition = (hand, index) => {
    return {
        x: (1 - hand[index].x) * width,
        y: hand[index].y * height,
    };
};
