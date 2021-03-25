import React, { useState, ChangeEvent, FunctionComponent } from 'react'
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
	Fade,
	CircularProgress,
	InputAdornment,
	IconButton
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import axios from '../utils/axios'
import { AxiosResponse, AxiosError } from 'axios'

import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		// minWidth: '500px'
	},
	textField: {
		position: 'relative',
		margin: '10px'
	},
	loginButton: {
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
	},
	circualProgress: {
		color: theme.palette.common.white		
	},
	registerButton: {
		marginTop: theme.spacing(6),
		marginRight: theme.spacing(4),
		marginLeft: theme.spacing(40)
	}
}))

type LoginPaperProps = {
    secondaryButtonOnClickHandler: () => void
}

export default function LoginPaper(props: LoginPaperProps) {
	const classes = useStyles()
	const [formData, setFormData] = useState({
		username: '',
		password: ''
	})
	const [errors, setErrors] = useState([''])
	const [loading, setLoading] = useState((false))
	const [showPassword, setShowPassword] = useState(false)

	const {
		secondaryButtonOnClickHandler
	} = props

	const updateUsername = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== 'username' && value !== 'password'))
		setFormData({
			...formData,
			username: event.target.value						
		})
	}

	const updatePassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== 'password' && value !== 'username'))
		setFormData({
			...formData,
			password: event.target.value,			
		})
	}

	const login = () => {
		const newErrors = ['']
		formData.username === '' && newErrors.push('emptyUsername') && setErrors(newErrors)
		formData.password === '' && newErrors.push('emptyPassword') && setErrors(newErrors)
		if (formData.username === '' || formData.password === '')
			return
		setLoading(true)
		axios.post('/user/login/', formData)
		.then((result: AxiosResponse<any>) => {
			console.log(result)
		})
		.catch((error: AxiosError<any>) => {
			if (error === undefined || error.response === undefined)
				return
			const { response } = error
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
			setLoading(false)
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
							error={errors.includes('username') || errors.includes('emptyUsername') || errors.includes('password')}
							variant="outlined"
							label="Nom d'utilisateur"
							className={classes.textField}
							onChange={updateUsername}
						/>
						<TextField
							value={formData.password}
							error={errors.includes('password') || errors.includes('emptyPassword') || errors.includes('username')}
							variant="outlined"
							label="Mot de passe"
							type={showPassword ? "text" : "password"}
							className={classes.textField}
							onChange={updatePassword}
							InputProps={{
								endAdornment: (
								  <InputAdornment position='end'>
									<IconButton
									  aria-label='toggle password visibility'
									  onClick={() => { setShowPassword(!showPassword) }}
									>
									  {showPassword && <VisibilityIcon />}
									  {!showPassword && <VisibilityOffIcon />}
									</IconButton>
								  </InputAdornment>
								),
							  }}
						/>
						{(errors.includes('username') || errors.includes('password')) && <Typography variant="subtitle2" align="center" color="error">{'Nom d\'utilisateur ou mot de passe incorrect'}</Typography>}
						{errors.includes('server') && <Typography variant="subtitle2" align="center" color="error">{'Le serveur à rencontré une erreur, veuillez réessayer'}</Typography>}
						{errors.includes('emptyUsername') && <Typography variant="subtitle2" align="center" color="error">{'Veuillez saisir un nom d\'utilisateur'}</Typography>}
						{errors.includes('emptyPassword') && <Typography variant="subtitle2" align="center" color="error">{'Veuillez saisir un mot de passe'}</Typography>}
						<Button
							size="large"
							variant="contained"
							color="primary"
							className={classes.loginButton}
							onClick={login}
							disabled={errors.length > 1}
						>
							{loading ? <CircularProgress className={classes.circualProgress} size={27}/> : 'Se connecter'}
						</Button>
						<Button
							size="small"
							variant="outlined"
							color="primary"
							className={ classes.registerButton }
							onClick={secondaryButtonOnClickHandler}
						>
							{"Inscrivez-vous"}
						</Button>
					</FormControl>
				</Paper>
			</Slide>
		</>
	)
}
