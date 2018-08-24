import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import Mime from './Mime'
import Navigation from './Nav'

const MimeView = (props) => {
	return (
		<Container fluid={true} className='fluid--no-padding'>
			<Navigation {...props} />
			<Row>
				<Col xs='12'>
					<Mime {...props} />
				</Col>
			</Row>
		</Container>
	)
}

export default MimeView
