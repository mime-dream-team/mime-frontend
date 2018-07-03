import React from 'react'
import MakeMime from './MakeMime'
import { Container, Row, Col } from 'reactstrap'

const Home = (props) => {
	return (
		<Container fluid={true}>
			<Row>
				<Col xs={{ size: '12' }} sm={{ size: '6', offset: '3' }}>
					<header className='home__header'>
						<h1 className='home__nameplate'>MIME</h1>
					</header>
					<h1>&#9634; &#9651; &#9644;</h1>
					<p className='home__intro'><span className='underline'>Mime</span> is a simple, easy-to-use wireframing tool. It uses a drawing assistant AI to transform your hand-drawn sketches into clean rectangles, circles, and lines in real-time. Like magic! Get started by entering the size of your wireframe.</p>
					<MakeMime history={ props.history } />
				</Col>
			</Row>
		</Container>
	)
}

export default Home
