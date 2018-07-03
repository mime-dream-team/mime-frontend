import React from 'react'
import { connect } from 'react-redux'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import Share from './Share'

const Navigation = (props) => {

	return (
		<Navbar fixed='true'>
			<NavbarBrand href='/'>MIME</NavbarBrand>
			<Share path={props.match.path} />
			<h1>{props.lastSave}</h1>
		</Navbar>
	)
}

const mapStateToProps = (state) => {
	return state.lastSave
}

export default connect(
	mapStateToProps
)(Navigation)
