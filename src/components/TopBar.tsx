import React from 'react'
import {
	Theme,
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import logo from '../assets/images/black_logo.png'

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		flexGrow: 1
	},
	appBar: {
		backgroundColor: theme.palette.primary.main,
		height: theme.appBar.height
	},
	title: {
		flexGrow: 1,
		textAlign: "center",
		zIndex: 1000,
		color: theme.palette.common.white
	},
	logo: {
		maxWidth: 102,
	}
}))

type TopBarProps = {

}

export default function TopBar(props: TopBarProps) {
	const classes = useStyles()

	return (
		<div className={classes.root} >
			<AppBar			
				className={classes.appBar}
			>
			<Toolbar>
				<img src={logo} className={classes.logo}/>
				<Typography variant="h6" className={classes.title}>
            		Rap Land Community
          		</Typography>
			</Toolbar>
			</AppBar>
	  </div>
	)
}
