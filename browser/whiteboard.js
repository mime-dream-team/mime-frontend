window.whiteboard = new window.EventEmitter();

(function () {

    // Ultimately, the color of our stroke;
    var color;

    // The color selection elements on the DOM.
    var colorElements = [].slice.call(document.querySelectorAll('.marker'));

    colorElements.forEach(function (el) {

        // Set the background color of this element
        // to its id (purple, red, blue, etc).
        el.style.backgroundColor = el.id;

        // Attach a click handler that will set our color variable to
        // the elements id, remove the selected class from all colors,
        // and then add the selected class to the clicked color.
        el.addEventListener('click', function () {
            color = this.id;
            document.querySelector('.selected').classList.remove('selected');
            this.classList.add('selected');
        });

    });

    var canvas = document.getElementById('paint');
    
    var ctx = canvas.getContext('2d')

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
    
    resize()
    window.addEventListener('resize', resize) 
    
    var currentMousePosition = {
        x: 0,
        y: 0
    };

    var lastMousePosition = {
        x: 0,
        y: 0
    };

    var drawing = false;

    canvas.addEventListener('mousedown', function (e) {
        drawing = true;
        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;
    });

    canvas.addEventListener('mouseup', function () {
        drawing = false;
    });

    canvas.addEventListener('mousemove', function (e) {

        if (!drawing) return;

        lastMousePosition.x = currentMousePosition.x;
        lastMousePosition.y = currentMousePosition.y;

        currentMousePosition.x = e.pageX - this.offsetLeft;
        currentMousePosition.y = e.pageY - this.offsetTop;

        whiteboard.draw(lastMousePosition, currentMousePosition, color, true);

    });

    whiteboard.draw = function (start, end, strokeColor, shouldBroadcast) {

        // Draw the line between the start and end positions
        // that is colored with the given color.
        ctx.beginPath();
        ctx.strokeStyle = strokeColor || 'black';
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.closePath();
        ctx.stroke();

        // If shouldBroadcast is truthy, we will emit a draw event to listeners
        // with the start, end and color data.
        if (shouldBroadcast) {
            whiteboard.emit('draw', start, end, strokeColor);
        }
        
    };

})();
