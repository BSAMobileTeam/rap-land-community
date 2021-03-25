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
	InputAdornment,
	IconButton,
	CircularProgress,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import axios from '../utils/axios'
import { AxiosResponse, AxiosError } from 'axios'
import {
	ErrorOutlineSharp,
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon
} from '@material-ui/icons'
import { error } from 'node:console'

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		minWidth: '500px'
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
	},
	logginButton: {
		marginTop: theme.spacing(6),
		marginRight: theme.spacing(4),
		marginLeft: theme.spacing(63)
	},
	circualProgress: {
		color: theme.palette.common.white		
	},
	errorMessages: {
		marginRight: theme.spacing(4),
		marginLeft: theme.spacing(4)

	}
}))

type RegistrationProps = {
    secondaryButtonOnClickHandler: () => void
}

export default function Registration(props: RegistrationProps) {
	const classes = useStyles()
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		confirmedPassword: ''
	})
	const [errors, setErrors] = useState([''])
	const [showPassword, setShowPassword] = useState(false)
	const [loading, setLoading] = useState((false))
	console.log(errors)

    const {
        secondaryButtonOnClickHandler
    } = props

	const updateEmail = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== "emailNotValid" && value !== "emailDomainNameNotValid" && value !== "emailAlreadyUsed"))
		if (event.target.value.includes('@') === false) {
			setErrors([...errors, "emailNotValid"])
		}
		setFormData({
			...formData,
			email: event.target.value
		})
	}

	const updateUsername = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== "usernameAlreadyUsed"))
		setFormData({
			...formData,
			username: event.target.value
		})
	}

	const updatePassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setErrors(errors.filter(value => value !== "passwordNotSafe" && value !== "passwordsNotIdentical"))
		if (event.target.value.length < 8) {
			setErrors([...errors, "passwordNotSafe"])
		}
		setFormData({
			...formData,
			password: event.target.value
		})
	}

	const updateConfirmedPassword = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setFormData({
			...formData,
			confirmedPassword: event.target.value
		})
		if (errors.includes("passwordsNotIdentical") == false && formData.password !== event.target.value) {
			setErrors([...errors, "passwordsNotIdentical"])
		}
		if (formData.password === event.target.value) {
			setErrors(errors.filter(value => value !== "passwordsNotIdentical"))
		}
	}

	const register = () => {
		setLoading(true)
		axios.post('/user/register', {
			email: formData.email,
			username: formData.username,
			password: formData.password
		})
		.then((result: AxiosResponse<any>) => {
			console.log(result)
		})
		.catch((error: AxiosError<any>) => {
			if (error === undefined || error.response === undefined)
				return
			const { response } = error
			switch (response.status) {
				case 422:
					switch (error.response.data) {
						case "This email is not valid":
							setErrors([...errors, "emailNotValid"])
							break;
						case "We can't check this email domain name. Try to use a public one.":
							setErrors([...errors, "emailDomainNameNotValid"])
							break;
						default:
							break;
					}
					break;
				case 424:
					switch (error.response.data) {
						case "Email address already used":
							setErrors([...errors, "emailAlreadyUsed"])
							break;
						case "Username already used":
							setErrors([...errors, "usernameAlreadyUsed"])
							break;
						default:
							break;
					}
					break;
				case 500:
					setErrors([...errors, "server"])
					break;
				default:
					break;
			}
			setLoading(false)
		})
	}

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
						value={formData.email}
						error={formData.email !== "" && errors.includes("emailNotValid") || errors.includes("emailDomainNameNotValid") || errors.includes("emailAlreadyUsed")}
						variant="outlined"
						label="Email"
						className={classes.textField}
						onChange={updateEmail}
					/>
					<TextField
						value={formData.username}
						error={errors.includes("usernameAlreadyUsed")}
						variant="outlined"
						label="Nom d'utilisateur"
						className={classes.textField}
						onChange={updateUsername}
					/>
					<TextField
						error={formData.password !== "" && errors.includes("passwordNotSafe") || errors.includes("passwordsNotIdentical")}
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
					<TextField
						disabled={formData.password === "" || errors.includes('passwordNotSafe') === true}
						error={errors.includes("passwordsNotIdentical")}
						variant="outlined"
						label="Confirmer le mot de passe"
						type="password"
						className={classes.textField}
						onChange={updateConfirmedPassword}
					/>
					{formData.email !== "" && errors.includes('emailNotValid') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Cette adresse email est incorrect, veuillez en saisir une autre"}</Typography>}
					{formData.email !== "" && errors.includes('emailDomainNameNotValid') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Nous n'avons pas pu reconnaitre le nom de domaine de l'adresse email, veuillez en saisir une autre"}</Typography>}
					{formData.email !== "" && errors.includes('emailAlreadyUsed') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Cette adresse email est déjà utilisée, veuillez en saisir une autre"}</Typography>}
					{formData.username !== "" && errors.includes('usernameAlreadyUsed') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Ce nom d'utilisateur est déjà utilisé, veuillez en saisir un autre"}</Typography>}
					{formData.password !== "" && errors.includes('server') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Le serveur à rencontré une erreur, veuillez réessayer"}</Typography>}
					{formData.password !== "" && errors.includes('passwordNotSafe') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Veuillez saisir au moins 8 caractères pour votre mot de passe"}</Typography>}
					{formData.confirmedPassword !== "" && errors.includes('passwordsNotIdentical') && <Typography className={classes.errorMessages} variant="subtitle2" align="center" color="error">{"Les mots de passe ne correspondent pas, veuillez réessayer"}</Typography>}
					<Button
						size="large"
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={register}
						disabled={errors.length > 1}
					>
						{loading ? <CircularProgress className={classes.circualProgress} size={27}/> : "S'inscrire"}
					</Button>
					<Button
						size="small"
						variant="outlined"
						color="primary"
						className={ classes.logginButton }
						onClick={secondaryButtonOnClickHandler}
					>
						{"Se connecter"}
					</Button>
				</FormControl>
			</Paper>
		</Slide>

	)
}
