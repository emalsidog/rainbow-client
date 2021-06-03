// Dependencies
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import {
	changeEmailAbortRequest,
	changeEmailReqRequest,
	changeEmailRequest,
} from "../../../../../redux/actions/user-actions";

// Utils
import { emailOptions } from "../../../../utils/validation-options";
import { formatToMinutesAndSeconds } from "../../../../utils/format-date";

// Components
import Modal from "../../../../common/modal";
import ShowFormError from "../../../../common/show-form-error";
import OtpBox from "../../../../common/otp-box";

// Types
import { EmailChangingProcess } from "../../../../../redux/actions/types/user-actions-types/user-common-types";

interface ChangeEmailProps {
	email: string;
	emailChangingProcess: EmailChangingProcess;

	isLoading: boolean;
}

interface Inputs {
	email: string;
	passcode: string;
}

const ChangeEmail: React.FC<ChangeEmailProps> = (props) => {
	const { email, isLoading, emailChangingProcess } = props;
	const { isChangingProcess, timeToNextEmail, newEmail } = emailChangingProcess;

	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<string | null>(null);
	const [otp, setOtp] = useState(new Array(6).fill(""));

	const dispatch = useDispatch();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(changeEmailReqRequest(data.email));
	};

	// On code submition
	const onCodeSubmit = () => {
		const otpString = otp.join("");
		dispatch(changeEmailRequest(otpString));
	};

	// On code resending
	const onCodeResend = () => {
		dispatch(changeEmailReqRequest(newEmail));
	};

	// On aborting
	const onAbort = () => {
		dispatch(changeEmailAbortRequest());
		setTimeLeft(null);
	};

	// Setting interval
	useEffect(() => {
		let intervalId: number;

		if (timeToNextEmail) {
			const timeLeftMs = timeToNextEmail - new Date().getTime();

			intervalId = window.setInterval(() => {
				setTimeLeft(formatToMinutesAndSeconds(timeLeftMs));
			}, 1000);

			if (timeToNextEmail < new Date().getTime()) {
				setTimeLeft(null);
				clearInterval(intervalId);
			}
		} else {
			setTimeLeft(null);
		}

		return () => {
			intervalId && clearInterval(intervalId);
		};
	}, [timeToNextEmail, timeLeft]);

	useEffect(() => {
		if (!isChangingProcess) {
			setOtp((prevState) => [...prevState.map(() => "")]);
		}
	}, [isChangingProcess]);

	const openModal = (): void => {
		setIsModalVisible(true);
	};

	const closeModal = (): void => {
		setIsModalVisible(false);
	};

	return (
		<React.Fragment>
			<div className="settings-row">
				<div className="settings-row-title">
					<div>Email</div>
				</div>

				<div className="settings-row-change">
					<span>{email}</span>
				</div>

				<div className="settings-row-action">
					<button onClick={openModal} className="btn-transperent">
						Change
					</button>
				</div>
			</div>
			<Modal
				isVisible={isModalVisible}
				isStatic={isChangingProcess || isLoading}
				title="Change your email"
				onClose={closeModal}
				footer={
					<React.Fragment>
						<div style={{ marginRight: "auto" }}>
							<button
								disabled={!isChangingProcess || isLoading}
								onClick={onAbort}
								className="btn btn-secondary"
							>
								Abort
							</button>
						</div>
						<div style={{ marginLeft: "auto" }}>
							<button
								disabled={timeLeft !== null || isLoading}
								onClick={
									isChangingProcess
										? onCodeResend
										: closeModal
								}
								className="btn btn-secondary"
								style={{ justifySelf: "flex-end" }}
							>
								{timeLeft
									? `Resend in: ${timeLeft}`
									: isChangingProcess
									? "Resend"
									: "Close"}
							</button>
							<button
								className="btn btn-primary"
								style={{ justifySelf: "flex-end" }}
								disabled={isLoading}
								onClick={
									isChangingProcess
										? onCodeSubmit
										: handleSubmit(onSubmit)
								}
							>
								{isChangingProcess
									? "Confirm"
									: isLoading
									? "Processing..."
									: "Send"}
							</button>
						</div>
					</React.Fragment>
				}
			>
				<form className="form-block" onSubmit={handleSubmit(onSubmit)}>
					<div className="form-group">
						<input
							{...register("email", emailOptions)}
							disabled={isChangingProcess}
							className="input"
							placeholder="New email"
							defaultValue={newEmail}
							autoFocus
						/>
						<ShowFormError message={errors.email?.message} />
					</div>
				</form>

				{isChangingProcess && <OtpBox otp={otp} setOtp={setOtp} onSubmit={onCodeSubmit} />}
			</Modal>
		</React.Fragment>
	);
};

export default ChangeEmail;
