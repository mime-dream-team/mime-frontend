import React from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand } from 'reactstrap'
import Share from './Share'

const Navigation = (props) => {

	return (
		<Navbar fixed='true'>
			<NavbarBrand href='/' className='nav__name'>Mime Wireframes</NavbarBrand>
			<Share path={props.match.path} />
			{<p className='nav__last-saved'>Saved at: <time>{props.lastSave || '00:00:00'}</time></p>}
		</Navbar>
	)
}

const mapStateToProps = (state) => {
	return { lastSave: state.lastSave }
}

export default connect(mapStateToProps)(Navigation)
