import React from 'react'
import {
	Theme,
	Paper,
	TextField,
	FormControl,
	InputLabel,
	Input,
	Button,
	Typography,
	Link,
	Slide
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'

const textDark = "#0D0D0D";
const borderLight = "rgba(206,212,218, .993)";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		// minWidth: '500px'
	},
	textField: {
		position: 'relative',
		margin: '10px'
	},
	button: {
		marginRight: theme.spacing(16),
		marginLeft: theme.spacing(16)
	},
	typography: {
		marginTop: "100vh"
	},
	link: {
		marginTop: "1vh",
		width: "100%",
		display: "inline-block",
		textAlign: "center"
	}
}))

type RegistrationProps = {
    linkOnClickHandler: () => void
}

export default function Registration(props: RegistrationProps) {
	const classes = useStyles()

    const {
        linkOnClickHandler
    } = props

	return (
		<Slide direction="up" in={true} mountOnEnter unmountOnExit>
			<Paper
				elevation={3}
				className={classes.root}
			>
				<FormControl
					required
					fullWidth
					margin="normal"
				>
					<TextField
						required
						variant="outlined"
						label="Email"
						className={classes.textField}
					/>
					<TextField
						required
						variant="outlined"
						label="Username"
						className={classes.textField}
					/>
					<TextField
						required
						variant="outlined"
						label="Password"
						type="password"
						className={classes.textField}
					/>
					<TextField
						required
						variant="outlined"
						label="Confirm password"
						type="password"
						className={classes.textField}
					/>
					<Button
						size="large"
						variant="contained"
						color="primary"
						className={classes.button}
					>
						Register
					</Button>
					<Typography className={classes.link}>
						<Link
							href="#"
							onClick={linkOnClickHandler}
						>
							{"I have an account. Sign in."}
						</Link>
					</Typography>
				</FormControl>
			</Paper>
		</Slide>

	)
}
