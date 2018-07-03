import React from 'react'
import MakeMime from './MakeMime'


const Home = () => {
	return (
		<section>
			<h1>Welcome to MIME</h1>
			<p>Mime is a simple, easy-to-use wireframing tool. It uses a drawing assistant AI to transform your hand-drawn sketches to clean rectangles, circles, and lines in real-time. Like magic! Get started by entering the size of your wireframe.</p>
			<MakeMime />
		</section>
	)
}


export default Home
