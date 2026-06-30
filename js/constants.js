let video;
let hands;

let landmarks = [];
let isProcessing = false;

const chars = "@%#*+=-:.       ";

const GESTURES = {
    NONE: "none",
};

const FILTERS = {
    ORIGINAL: "original",
    GRAYSCALE: "grayscale",
    ASCII: "ascii",
    PIXELATE: "pixelate",
    THERMAL: "thermal",
    NEON_EDGE: "neon edge",
    KALEIDOSCOPE: "Kaleidoscope",
};

let currentFilter = FILTERS.ASCII;
