import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Logo from './Logo'

const Home = (props) => {
	return (
		<Container fluid={true}>
			<Row>
				<Col sm={{ size: '10', offset: '1' }} md={{ size: '6', offset: '3' }}>
					<header className="home__header">
						<Logo />
					</header>
					<p className="home__intro">
						<span className="underline">Mime</span> is an easy-to-use,
						minimalist wireframing tool. As you sketch, your hand-drawn circles
						and rectangles are transformed into clean shapes in real-time. Like
						magic!
					</p>
					<figure className="embed-responsive embed-responsive-16by9">
						<iframe
							className="embed-responsive-item"
							src="https://www.youtube.com/embed/HG2ZZigbxG0"
							frameBorder="0"
							allow="autoplay; encrypted-media"
							allowFullScreen
						/>
					</figure>
					<p className="home__stack">
						Mime runs on a NERD stack: Node, Express, React/Redux and a SQL
						database. It uses its own custom-built TensorFlow.js model to
						identify the shape of your drawings. React-Konva, a robust canvas
						library, provides the drawing tools and movable shapes. Touch
						support for tablets and iPads is in beta. Watch the video above for
						a walkthrough by Mime's creators. View the codebase on{' '}
						<a href="https://github.com/mime-dream-team/mime-frontend">
							GitHub
						</a>.
					</p>
				</Col>
			</Row>
		</Container>
	)
}

export default Home
