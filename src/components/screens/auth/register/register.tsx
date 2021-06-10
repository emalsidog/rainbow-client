// Dependencies
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// Actions
import { registerRequest } from "../../../../redux/auth/actions";

// Selectors
import {
	selectIsLoading,
	selectIsAuthenticated,
} from "../../../../redux/auth/selector";
import { selectUser } from "../../../../redux/user/selector";

// Utils
import {
	givenNameOptions,
	familyNameOptions,
	emailOptions,
	passwordOptions,
} from "../../../utils/validation-options";

// Styles
import styles from "../auth.module.css";

// Components
import ShowFormError from "../../../common/show-form-error";

// Types
type Inputs = {
	givenName: string;
	familyName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register: React.FC = () => {
	const history = useHistory();

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const isAuthenticated = useSelector(selectIsAuthenticated);
	const user = useSelector(selectUser);

	useEffect(() => {
		if (isAuthenticated) {
			history.push(`/${user.profileId}`);
		}
	}, [isAuthenticated, user, history]);

	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(registerRequest(data));
	};

	const password = useRef<string>("");
	password.current = watch("password", "");

	return (
		<div className={styles.container}>
			<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.header}>Registration</div>

				<div className="form-group">
					<input
						{...register("givenName", givenNameOptions)}
						className="input"
						placeholder="Given name"
						type="text"
						disabled={isLoading}
					/>
					<ShowFormError message={errors.givenName?.message} />
				</div>

				<div className="form-group">
					<input
						{...register("familyName", familyNameOptions)}
						className="input"
						placeholder="Family name"
						type="text"
						disabled={isLoading}
					/>
					<ShowFormError message={errors.familyName?.message} />
				</div>
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
				<div className="form-group">
					<input
						{...register("confirmPassword", {
							validate: (value) =>
								value === password.current ||
								"Passwords do not match",
						})}
						className="input"
						placeholder="Confirm password"
						type="password"
						disabled={isLoading}
					/>
					<ShowFormError message={errors.confirmPassword?.message} />
				</div>

				<button
					disabled={isLoading}
					className="btn btn-primary"
					type="submit"
				>
					{isLoading ? "Registering..." : "Register"}
				</button>
			</form>
			<div className={`${styles.wrapper} ${styles.centered}`}>
				<span>
					<span>Already have an account? </span>
					<Link className="link" to="/users/login">Login</Link>
				</span>
			</div>
		</div>
	);
};

export default Register;
