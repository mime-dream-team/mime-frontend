import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Share = (props) => {
	const mailMessage = "mailto:?&subject=Check%20out%20my%20Mime&body=I've%20made%20a%20wireframe%20at%20"
	return (
		<div>
			<CopyToClipboard text={window.location.href}>
				<button>Copy</button>
			</CopyToClipboard>
			<a href={mailMessage + window.location.href}><button>Mail</button></a>
		</div>
	)
}

export default Share