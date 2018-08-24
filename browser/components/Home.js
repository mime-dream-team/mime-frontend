import React from 'react'
import MakeMime from './MakeMime'
import { Container, Row, Col } from 'reactstrap'
import Logo from './Logo';

const Home = (props) => {
	return (
		<Container fluid={true}>
			<Row>
				<Col md={{ size: '10', offset: '1' }} lg={{ size: '8', offset: '2' }} xl={{ size: '6', offset: '3' }}>
					<header className='home__header col-sm-11 col-md-10 col-xs-12'>
						<Logo />
					</header>
					<p className='home__intro home__intro--top'><span className='underline'>Mime</span> is a simple, easy-to-use wireframing tool powered by machine learning. It uses a drawing assistant AI to transform your hand-drawn sketches into clean rectangles, circles, and lines in real-time. Like magic!</p>
					<p className='home__intro'>Get started by entering the size of your wireframe.</p>
					<MakeMime history={ props.history } />
					<p className='home__about home__about--top'>Mime was built by <a href='https://github.com/ivanfex'>Ivan Felix</a>, <a href='https://github.com/cofuente'>Chiara Marcial Martínez</a>, and <a href='http://www.lizzthabet.com'>Lizz Thabet</a>. It runs on a NERD stack: Node, Express, React/Redux, and a SQL database. Mime uses its own custom-built <a href='https://js.tensorflow.org/'>TensorFlow.js</a> model to identify the shape of your drawings. <a href='https://github.com/konvajs/react-konva'>React-Konva</a>, a robust canvas library, provides the drawing tools and movable shapes. Touch support for tablets and iPads is in beta.</p>
					<p className='home__about home__about--bottom'>For a full walkthrough of the app, head to <a href='https://youtu.be/HG2ZZigbxG0?t=35s'>YouTube</a>. View the codebase on <a href='https://github.com/mime-dream-team'>GitHub</a>.</p>
				</Col>
			</Row>
		</Container>
	)
}

export default Home
