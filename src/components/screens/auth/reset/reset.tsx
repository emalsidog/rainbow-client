// Dependencies
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

// Actions
import { resetRequest } from "../../../../redux/actions/auth-actions";

// Selectors
import {
	selectIsLoading,
	selectRedirect,
} from "../../../../redux/selectors/auth-selector";

// Utils
import { passwordOptions } from "../../../utils/validation-options";

// Styles
import styles from "../auth.module.css";

// Components
import ShowFormError from "../../../common/show-form-error";

// Types
type Inputs = {
	password: string;
	confirmPassword: string;
};

const Reset: React.FC = () => {
	const history = useHistory();
	const { resetToken }: any = useParams();

	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const redirect = useSelector(selectRedirect);

	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const payload = { ...data, resetToken };
		dispatch(resetRequest(payload));
	};

	const password = useRef<string>("");
	password.current = watch("password", "");

	useEffect(() => {
		if (redirect) {
			history.push("/users/login");
		}
	}, [history, redirect]);

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
				<div className={styles.header}>Reset password</div>
				<div className="form-group">
					<input
						{...register("password", passwordOptions)}
						className="input"
						placeholder="New password"
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
						placeholder="Comfirm password"
						type="password"
						disabled={isLoading}
					/>
					<ShowFormError message={errors.confirmPassword?.message} />
				</div>
				<button disabled={isLoading} className="btn btn-primary">
					{isLoading ? "Resetting..." : "Reset"}
				</button>
			</form>
		</div>
	);
};

export default Reset;
