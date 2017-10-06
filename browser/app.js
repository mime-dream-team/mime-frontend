// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'
import io from 'socket.io-client';

// Example of listening to draw events:
//   (This logging will probably get really annoying):
whiteboard.on('draw', console.log)

// Example: Draw a single stroke.
// draw([0, 0], [250, 250], 'red', true)

const socket = io(window.location.origin)

socket.on('connect', () => console.log('I have made a persistent two-way connection to the server!'));

socket.on('load', function (strokes) {

  strokes.forEach(function (stroke) {
    const { start, end, color } = stroke;
    draw(start, end, color, false);
  });

});

socket.on('draw', function (start, end, color) {
  draw(start, end, color, false);
});

whiteboard.on('draw', function (start, end, color) {
  socket.emit('draw', start, end, color);
});
