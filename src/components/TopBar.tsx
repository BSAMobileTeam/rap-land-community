import React from 'react'
import {
	Theme,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button
} from '@material-ui/core'
import {
	Menu as MenuIcon
} from '@material-ui/icons'
import { createStyles, makeStyles, useTheme} from '@material-ui/styles'
import logo from '../assets/images/black_logo.png'

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		flexGrow: 1
	},
	appBar: {
		backgroundColor: theme.palette.primary.main,
		height: theme.appBar.height
	},
	logo: {
		maxWidth: 102,
      	marginRight: '10px'
	}
}))

type TopBarProps = {

}

export default function TopBar(props: TopBarProps) {
	const classes = useStyles()
	const theme = useTheme()

	return (
		<div className={classes.root} >
			<AppBar			
				className={classes.appBar}
			>
			<Toolbar>
				<img src={logo} className={classes.logo}/>
			</Toolbar>
			</AppBar>
	  </div>
	)
}
