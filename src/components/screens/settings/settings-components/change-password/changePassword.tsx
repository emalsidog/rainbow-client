// Dependencies
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { passwordOptions } from "../../../../utils/validation-options";

// Actions
import { changePasswordRequest } from "../../../../../redux/actions/user-actions";

// Utils
import ShowFormError from "../../../../common/show-form-error";
import { formatDate } from "../../../../utils/format-date";

// Types
interface ChangePasswordProps {
	isLoading: boolean;

    lastTimeChanged: Date | undefined;
}

interface Inputs {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
	const { isLoading, lastTimeChanged } = props;

    const dispatch = useDispatch();

	const [changePasswordShow, setChangePasswordShow] =
		useState<boolean>(false);

	const {
		watch,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(changePasswordRequest(data));
	};

	const password = useRef<string>("");
	password.current = watch("newPassword", "");

	const handleChangePasswordShow = (): void => {
		setChangePasswordShow((prev) => !prev);
	};

	return (
		<div className="settings-row">
			<div className="settings-row-title">
				<div>Password</div>
			</div>

			<div className="settings-row-change">
				{!changePasswordShow && <span>Last changed: <b>{formatDate(lastTimeChanged)}</b></span>}
				{changePasswordShow && (
					<form
						className="form-block"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="form-group">
							<input
								{...register("oldPassword", passwordOptions)}
                                disabled={isLoading}
								className="input"
                                type="password"
								placeholder="Your old password"
							/>
							<ShowFormError
								message={errors.oldPassword?.message}
							/>
						</div>
						<div className="form-group">
							<input
								{...register("newPassword", passwordOptions)}
                                disabled={isLoading}
								className="input"
                                type="password"
								placeholder="New password"
							/>
							<ShowFormError
								message={errors.newPassword?.message}
							/>
						</div>
						<div className="form-group">
							<input
								{...register("confirmNewPassword", {
									validate: (value) =>
										value === password.current ||
										"Passwords do not match",
								})}
                                disabled={isLoading}
								className="input"
                                type="password"
								placeholder="Confirm new password"
							/>
							<ShowFormError
								message={errors.confirmNewPassword?.message}
							/>
						</div>
						<button className="btn btn-primary" disabled={isLoading}>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</form>
				)}
			</div>

			<div className="settings-row-action">
				<button
					onClick={handleChangePasswordShow}
					className="btn-transperent"
				>
					{changePasswordShow ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default ChangePassword;
