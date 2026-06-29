# Fancy Snap

A minimal browser-based web app that captures camera video and overlays a live filter effect inside a hand-based selection rectangle. It uses p5.js for canvas rendering and MediaPipe Hands for hand landmark detection.

## Features

- Live webcam feed rendered on a full-screen canvas
- Hand detection using MediaPipe Hands
- Filter effects applied to an active rectangle between two index fingertips
- Keyboard controls to switch filters in real time

## Files

- `index.html` - App entry point and script loading order
- `style.css` - Basic page reset for full-screen canvas
- `js/constants.js` - Shared constants and filter state
- `js/utils.js` - Utility helpers for coordinate conversion
- `js/camera.js` - Camera capture and MediaPipe hand detection setup
- `js/gestures.js` - Gesture helper (currently only a placeholder)
- `js/rectangle.js` - Rectangle position and filter rendering logic
- `js/sketch.js` - Main p5.js setup, draw loop, and keyboard controls

## How to Use

1. Open the project in a browser.
2. Allow camera access when prompted.
3. Place two hands in view so each index fingertip can be tracked.
4. The app draws a selection rectangle between the two index fingertips and applies the selected filter inside that rectangle.

## Controls

- `1` → Original
- `2` → Grayscale
- `3` → ASCII
- `4` → Pixelate

The currently active filter is shown in the top overlay.

## Recommended Launch

For best results, serve the project from a local web server instead of opening the file directly:

- Using VS Code Live Server extension
- Or using Python 3:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Notes

- The app depends on external CDN scripts for p5.js and MediaPipe.
- Camera access may require HTTPS or a local server in some browsers.
- Gesture detection is currently a placeholder; the main interaction is the hand rectangle and filter selection.

## Extending the App

If you want to improve the experience, consider:

- Adding more robust gesture recognition in `js/gestures.js`
- Supporting full-screen button controls in the UI
- Adding additional filters or smoothing the rectangle movement
- Handling cases when only one hand is visible
