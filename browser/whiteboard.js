'use strict'

/**
 * Creates a whiteboard on the page that the user can scribble on.
 *
 * Exports:
 *   - default draw(from, to, color, shouldBroadcast)
 *   - events: an EventEmitter that emits `draw` events.
 */

import {EventEmitter} from 'events'

const events = new EventEmitter()

export default events

//// Canvas setup
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

/**
 * Draw a line on the whiteboard.
 *
 * @param {[Number, Number]} start start point
 * @param {[Number, Number]} end end point
 * @param {String} strokeColor color of the line
 * @param {bool} shouldBroadcast whether to emit an event for this draw
 */
export function draw(start, end, strokeColor='black', shouldBroadcast=true) {
    // Draw the line between the start and end positions
    // that is colored with the given color.
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.moveTo(...start);
    ctx.lineTo(...end);
    ctx.closePath();
    ctx.stroke();

    // If shouldBroadcast is truthy, we will emit a draw event to listeners
    // with the start, end and color data.
    shouldBroadcast &&
        events.emit('draw', start, end, strokeColor);
};

// State
//// Stroke color
let color;
//// Position tracking
let currentMousePosition = {
    x: 0,
    y: 0
};

let lastMousePosition = {
    x: 0,
    y: 0
};

//// Color picker settings
const colors = [
    'black',
    'purple',
    'red',
    'green',
    'orange',
    'yellow',
    'brown',
]

function setup() {
    document.body.appendChild(canvas)

    setupColorPicker()
    setupCanvas()
}

function setupColorPicker() {
    const picker = document.createElement('div')
    picker.classList.add('color-selector')
    colors
        .map(color => {
            const marker = document.createElement('div')
            marker.classList.add('marker')
            marker.dataset.color = color
            marker.style.backgroundColor = color
            return marker
        })
        .forEach(color => picker.appendChild(color))

    picker.addEventListener('click', ({target}) => {
        color = target.dataset.color
        if (!color) return
        const current = picker.querySelector('.selected')
        current && current.classList.remove('selected')
        target.classList.add('selected')
    })

    document.body.appendChild(picker)

    // Select the first color
    picker.firstChild.click()
}


function resize() {
    // Unscale the canvas (if it was previously scaled)
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // The device pixel ratio is the multiplier between CSS pixels
    // and device pixels
    var pixelRatio = window.devicePixelRatio || 1;

    // Allocate backing store large enough to give us a 1:1 device pixel
    // to canvas pixel ratio.
    var w = canvas.clientWidth * pixelRatio,
        h = canvas.clientHeight * pixelRatio;
    if (w !== canvas.width || h !== canvas.height) {
        // Resizing the canvas destroys the current content.
        // So, save it...
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        canvas.width = w; canvas.height = h;

        // ...then restore it.
        ctx.putImageData(imgData, 0, 0)
    }

    // Scale the canvas' internal coordinate system by the device pixel
    // ratio to ensure that 1 canvas unit = 1 css pixel, even though our
    // backing store is larger.
    ctx.scale(pixelRatio, pixelRatio);

    ctx.lineWidth = 5
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
}

function setupCanvas() {
    // Set the size of the canvas and attach a listener
    // to handle resizing.
    resize()
    window.addEventListener('resize', resize)

    window.addEventListener('mousedown', function (e) {
        currentMousePosition = pos(e)
    });

    window.addEventListener('mousemove', function (e) {
        if (!e.buttons) return;
        lastMousePosition = currentMousePosition
        currentMousePosition = pos(e)
        lastMousePosition && currentMousePosition &&
            draw(lastMousePosition, currentMousePosition, color, true);
    });
}

function pos(e) {
    return [
        e.pageX - canvas.offsetLeft,
        e.pageY - canvas.offsetTop
    ]
}

document.addEventListener('DOMContentLoaded', setup)
