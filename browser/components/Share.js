import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faClipboard } from '@fortawesome/free-solid-svg-icons'

const Share = (props) => {
	const mailMessage = "mailto:?&subject=Check%20out%20my%20Mime&body=I've%20made%20a%20wireframe%20at%20"
	return (
		<div>
			<CopyToClipboard text={window.location.href} aria-label='Copy link to clipboard' >
				<button className='nav__button' type='button'>
					<FontAwesomeIcon icon={ faClipboard } size='2x' aria-hidden={ false } />
				</button>
			</CopyToClipboard>
			<a href={mailMessage + window.location.href} aria-label='Email link'>
				<button className='nav__button' type='button'>
					<FontAwesomeIcon icon={ faEnvelope } aria-hidden={ false } size='2x' />
				</button>
			</a>
		</div>
	)
}

export default Share
