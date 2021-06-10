// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// Actions
import {
	loginRequest,
	forgotRequest,
} from "../../../../redux/auth/actions";

// Selectors
import {
	selectIsLoading,
	selectIsAuthenticated,
	selectIsLoadingForgotPassword,
} from "../../../../redux/auth/selector";
import { selectUser } from "../../../../redux/user/selector";

// Utils
import {
	emailOptions,
	passwordOptions,
} from "../../../utils/validation-options";
import { formatToMinutesAndSeconds } from "../../../utils/format-date";

// Styles
import styles from "../auth.module.css";

// Components
import ShowFormError from "../../../common/show-form-error";
import Modal from "../../../common/modal";

// Types
type Inputs = {
	email: string;
	password: string;
};

type InputsForgot = {
	email: string;
};

const Login: React.FC = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<string | null>(null);

	const history = useHistory();

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const isLoadingForgotPassword = useSelector(selectIsLoadingForgotPassword);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	let timeToNextEmail: number = Number(
		localStorage.getItem("timeToNextEmail")
	);

	useEffect(() => {
		let intervalId: number;

		if (timeToNextEmail) {
			const timeLeftMs = timeToNextEmail - new Date().getTime();

			intervalId = window.setInterval(() => {
				console.log(timeLeftMs);
				setTimeLeft(formatToMinutesAndSeconds(timeLeftMs));
			}, 1000);

			if (timeToNextEmail < new Date().getTime()) {
				setTimeLeft(null);
				clearInterval(intervalId);
				localStorage.removeItem("timeToNextEmail");
			}
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [timeToNextEmail, timeLeft]);

	useEffect(() => {
		if (isAuthenticated) {
			history.push(`/${user.profileId}`);
		}
	}, [isAuthenticated, user, history]);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(loginRequest(data));
	};

	const {
		register: registerForgot,
		formState: { errors: errorsForgot },
		handleSubmit: handleSubmitForgot,
	} = useForm();

	const onForgotSubmit: SubmitHandler<InputsForgot> = (data) => {
		dispatch(forgotRequest(data.email));
	};

	const handleForgotPassword = () => {
		setIsVisible(true);
	};

	const handleModalClose = () => {
		setIsVisible(false);
	};

	return (
		<React.Fragment>
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.header}>Login</div>
						<div className="form-group">
							<input
								{...register("email", emailOptions)}
								className="input"
								placeholder="Email"
								type="text"
								disabled={isLoading}
							/>
							<ShowFormError message={errors.email?.message} />
						</div>
						<div className="form-group">
							<input
								{...register("password", passwordOptions)}
								className="input"
								placeholder="Password"
								type="password"
								disabled={isLoading}
							/>
							<ShowFormError message={errors.password?.message} />
						</div>

						<button
							disabled={isLoading}
							className="btn btn-primary"
							type="submit"
						>
							{isLoading ? "Logging you in..." : "Login"}
						</button>
					</form>

					<div className="divider">OR</div>

					<div className={styles.forgot}>
						<button
							onClick={handleForgotPassword}
							className="btn-transperent"
						>
							Forgot password?
						</button>
					</div>
				</div>
				<div className={`${styles.wrapper} ${styles.centered}`}>
					<span>Do not have an account? </span>
					<Link className="link" to="/users/register">
						Register
					</Link>
				</div>
			</div>

			<Modal
				title="Forgot password?"
				isVisible={isVisible}
				isStatic={isLoadingForgotPassword}
				footer={
					<div style={{ justifySelf: "flex-end" }}>
						<button
							disabled={isLoadingForgotPassword}
							className="btn btn-secondary"
							onClick={handleModalClose}
						>
							Close
						</button>
						<button
							disabled={
								isLoadingForgotPassword || !!timeToNextEmail
							}
							className="btn btn-primary"
							onClick={handleSubmitForgot(onForgotSubmit)}
						>
							{isLoadingForgotPassword
								? "Loading..."
								: timeLeft
								? timeLeft
								: !!timeToNextEmail
								? "In process..."
								: "Recover"}
						</button>
					</div>
				}
				onClose={handleModalClose}
			>
				<form
					onSubmit={handleSubmitForgot(onForgotSubmit)}
					id="recover"
				>
					<div className="form-group">
						<input
							{...registerForgot("email", emailOptions)}
							className="input"
							placeholder="Email"
							disabled={
								isLoadingForgotPassword || timeLeft !== null
							}
						/>
						<ShowFormError message={errorsForgot.email?.message} />
					</div>
				</form>
			</Modal>
		</React.Fragment>
	);
};

export default Login;
