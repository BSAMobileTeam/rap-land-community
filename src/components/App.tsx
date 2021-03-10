import React, { useState } from 'react'
import {
	Theme,
	Grid,
	Box,
} from '@material-ui/core'
import { createStyles, makeStyles, ThemeProvider } from '@material-ui/styles'
import TopBar from './TopBar'
import LoginPaper from './LoginPaper'
import RegistrationPaper from './RegistrationPaper'
import customTheme from '../theme'

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		
	},
	gridItem: {
		// marginRight: '30vw'
	}
}))

type AppProps = {
}

export default function App(props: AppProps) {
	const classes = useStyles()
	const [formMode, setFormMode] = useState("login")

	return (
		<ThemeProvider theme={customTheme}>
			<div>
				<TopBar/>
			</div>
			<Grid
				container 				
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '70vh' }}
			>
				<Grid
					className={classes.gridItem}
					item
					xs={3}
				>
					{
						formMode === "login" ?
						<LoginPaper
							linkOnClickHandler={() => { setFormMode("registration") }}
						/>
						:
						<RegistrationPaper
							linkOnClickHandler={() => { setFormMode("login") }}
						/>
					}
				</Grid>
			</Grid>
		</ThemeProvider>
	)
}
