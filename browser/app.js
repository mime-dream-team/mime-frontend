// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named 'events', calling it 'whiteboard'.
import draw, {events as whiteboard} from './whiteboard'

// This logging will probably get really annoying:
whiteboard.on('draw', console.log)

// Draw a single stroke.
draw([0, 0], [250, 250], 'red', true)
