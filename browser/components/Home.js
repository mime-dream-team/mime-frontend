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
					<p className='home__intro'><span className='underline'>Mime</span> is an easy-to-use, minimalist wireframing tool. As you sketch, your hand-drawn circles and rectangles are transformed into clean shapes in real-time. Like magic!</p>
					{/* <p className='home__intro'>Get started by entering the size of your wireframe.</p>
					<MakeMime history={ props.history } /> */}
					<iframe width="560" height="315" src="https://www.youtube.com/embed/HG2ZZigbxG0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</Col>
			</Row>
		</Container>
	)
}

export default Home
