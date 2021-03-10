import React, { useState, ChangeEvent } from 'react'
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
	Slide,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
	ListItemText,
	List,
	Zoom,
	Grow,
	Fade
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import axios from '../utils/axios'
import { AxiosResponse, AxiosError } from 'axios'
import { TransitionProps } from '@material-ui/core/transitions';


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

type LoginPaperProps = {
    linkOnClickHandler: () => void
}

const DialogTransition = React.forwardRef(function Transition(
	props: TransitionProps & { children?: React.ReactElement<any, any> },
	ref: React.Ref<unknown>,
  ) {
	return <Fade ref={ref} {...props} />;
})

export default function LoginPaper(props: LoginPaperProps) {
	const classes = useStyles()
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const [errors, setErrors] = useState([''])

	const {
		linkOnClickHandler
	} = props

	const updateUsername = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== 'username'))
		setFormData({
			...formData,
			username: event.target.value						
		})
	}

	const updatePassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== 'password'))
		setFormData({
			...formData,
			password: event.target.value
		})
	}

	const login = () => {
		if (formData.username === '' || formData.password === '')
			return
		axios.post('/user/login/', formData)
		.then((result: AxiosResponse<any>) => {
			console.log(result)
		})
		.catch((error: AxiosError<any>) => {
			if (error === undefined || error.response === undefined)
				return
			const { response } = error
			const newErrors = ['']
			switch (response.status) {
				case 404:
					newErrors.push('username')
					break;
				case 403:
					newErrors.push('password')
					break;
				case 500:
					newErrors.push('server')
					break;
				default:
					break;
			}
			setErrors(newErrors)
			setFormData({
				...formData,
				password: ''
			})
		})
	}
	return (
		<>
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
							value={formData.username}
							error={errors.includes('username')}
							required
							variant="outlined"
							label="Username"
							className={classes.textField}
							onChange={updateUsername}
						/>
						<TextField
							value={formData.password}
							error={errors.includes('password')}
							required
							variant="outlined"
							label="Password"
							type="password"
							className={classes.textField}
							onChange={updatePassword}
						/>
						{errors.includes('username') && <Typography variant="subtitle2" align="center" color="error">{'Nom d\'utilisateur incorrect'}</Typography>}
						{errors.includes('password') && <Typography variant="subtitle2" align="center" color="error">{'Mot de passe incorrect'}</Typography>}
						{errors.includes('server') && <Typography variant="subtitle2" align="center" color="error">{'Le serveur à rencontré une erreur, veuillez réessayer'}</Typography>}
						<Button
							size="large"
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={login}
						>
							Connexion
						</Button>
						<Typography className={classes.link}>
							<Link
								href="#"
								onClick={linkOnClickHandler}
							>
								{"I don't have an account. Sign up."}
							</Link>
						</Typography>
					</FormControl>
				</Paper>
			</Slide>
		</>
	)
}
