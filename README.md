# Mime

Mime is a simple, easy-to-use wireframing tool. It uses a drawing assistant AI to transform your hand-drawn sketches into clean lines, rectangles, and circles in real-time. 

Our application is powered by a TensorFlow.js (TF) model that we trained to recognize basic shapes using strokes drawn on an HTML canvas. The front-end workspace relies on React-Konva.js to create moveable, transformable shapes, Socket.io to communicate with the TF model, and React/Redux to manage wireframe rendering and updates. 

Each wireframe is automatically saved to a PostgreSQL database and accessible through a unique URL. Touch support is beta. 

Presentation: https://www.youtube.com/watch?t=33&v=HG2ZZigbxG0&feature=youtu.be

Mime is built by [Ivan Felix](https://github.com/ivanfex), [Chiara Marcial Martínez](https://github.com/cofuente), and [Lizz Thabet](https://github.com/lizzthabet).
