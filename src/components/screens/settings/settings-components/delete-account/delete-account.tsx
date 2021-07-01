// Dependencies
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Acitions
import { deleteAccountRequest } from "../../../../../redux/user/actions";

// Utils
import { passwordOptions } from "../../../../utils/validation-options";

// Styles
import "./delete-account.css";

// Components
import Modal from "../../../../common/modal";
import ShowFormError from "../../../../common/show-form-error";

// Types
interface DeleteAccountProps {
	isLoading: boolean;
}

interface Inputs {
	password: string;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ isLoading }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const dispatch = useDispatch();

	const openModal = () => {
		setIsVisible(true);
	};

	const closeModal = () => {
		setIsVisible(false);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(deleteAccountRequest(data.password));
	};

	return (
		<React.Fragment>
			<div className="settings-row">
				<div className="settings-row-title">
					<div style={{ fontStyle: "italic" }}>
						Delete your account
					</div>
				</div>

				<div className="settings-row-action">
					<button onClick={openModal} className="btn-transperent">
						Delete
					</button>
				</div>
			</div>
			<Modal
				title="Delete your account"
				isVisible={isVisible}
				isLoading={isLoading}
				isStatic={isLoading}
				onClose={closeModal}
				onOk={handleSubmit(onSubmit)}
			>
				<form className="form-block" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<input
							{...register("password", passwordOptions)}
							className="input"
							placeholder="Confirm by entering your password"
							type="password"
							disabled={isLoading}
						/>
						<ShowFormError message={errors.password?.message} />
					</div>

					<div className="delete-info">
						<span>
							After deletion process, you will be immediately
							redirected to the login page. All data will be
							erased and it will not be possible to recover it
						</span>
					</div>
				</form>
			</Modal>
		</React.Fragment>
	);
};

export default DeleteAccount;
