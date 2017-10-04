// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'

// Example of listening to draw events:
//   (This logging will probably get really annoying):
whiteboard.on('draw', console.log)

// Example: Draw a single stroke.
draw([0, 0], [250, 250], 'red', true)
