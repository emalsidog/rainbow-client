// Dependencies
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { changeProfileIdRequest } from "../../../../../redux/user/actions";

// Utils
import { profileIdOptions } from "../../../../utils/validation-options";

// Components
import ShowFormError from "../../../../common/show-form-error";

// Types
interface ChangeNameProps {
	profileId: string;

	isLoading: boolean;
}

interface Inputs {
	profileId: string;
}

const ChangeName: React.FC<ChangeNameProps> = (props) => {
	const { profileId, isLoading } = props;

	const [changeProfileIdShow, setChangeProfileIdShow] =
		useState<boolean>(false);

	const dispatch = useDispatch();

	const {
		watch,
		reset,
		register,
		formState: { errors, isDirty },
		handleSubmit,
	} = useForm<Inputs>({
		defaultValues: {
			profileId,
		},
	});

    const userInput = watch("profileId");

	const onSubmit: SubmitHandler<Inputs> = ({ profileId }) => {
		dispatch(changeProfileIdRequest(profileId));
	};

	useEffect(() => {
		reset({ profileId });
	}, [profileId, reset]);

	const handleChangeProfileIdShow = () => {
		setChangeProfileIdShow((prev) => !prev);
		reset({ profileId });
	};

	return (
		<div className="settings-row">
			<div className="settings-row-title">
				<div>Profile ID</div>
			</div>

			<div className="settings-row-change">
				<span>
					http://localhost:3000/<b>{userInput}</b>
				</span>
				{changeProfileIdShow && (
					<form
						className="form-block"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="form-group">
							<input
								{...register("profileId", profileIdOptions)}
								className="input"
								placeholder="New profile ID"
							/>
							<ShowFormError
								message={errors.profileId?.message}
							/>
						</div>
						<button
							disabled={!isDirty || isLoading}
							className="btn btn-primary"
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</form>
				)}
			</div>

			<div className="settings-row-action">
				<button
					onClick={handleChangeProfileIdShow}
					className="btn-transperent"
				>
					{changeProfileIdShow ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default ChangeName;
