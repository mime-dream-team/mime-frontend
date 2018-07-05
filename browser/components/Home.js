import React from 'react'
import MakeMime from './MakeMime'
import { Container, Row, Col } from 'reactstrap'
import Logo from './Logo';

const Home = (props) => {
	return (
		<Container fluid={true}>
			<Row>
				<Col sm={{ size: '10', offset: '1' }} md={{ size: '6', offset: '3' }}>
					<header className='home__header'>
						<Logo />
					</header>
					<p className='home__intro'><span className='underline'>Mime</span> is a simple, easy-to-use wireframing tool. It uses a drawing assistant AI to transform your hand-drawn sketches into clean rectangles, circles, and lines in real-time. Like magic!</p>
					<p className='home__intro'>Get started by entering the size of your wireframe.</p>
					<MakeMime history={ props.history } />
				</Col>
			</Row>
		</Container>
	)
}

export default Home
