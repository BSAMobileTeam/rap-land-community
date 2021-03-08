import React from 'react'
import {
	Theme
} from '@material-ui/core'
import { createStyles, makeStyles, ThemeProvider, useTheme} from '@material-ui/styles'
import TopBar from './TopBar'
import customTheme from '../theme'

const useStyles = makeStyles((theme: Theme) => createStyles({
	app: {
		backgroundColor: 'blue'
	}
}))

type AppProps = {

}

export default function App(props: AppProps) {
	const classes = useStyles()
	const theme = useTheme()

	return (
		<ThemeProvider theme={customTheme}>
			<div className={classes.app}>
				<TopBar/>
			</div>
		</ThemeProvider>
	)
}
