// Dependencies
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

// Actions
import { changeNameRequest } from "../../../../../redux/user/actions";

// Utils
import {
	familyNameOptions,
	givenNameOptions,
} from "../../../../utils/validation-options";

// Components
import ShowFormError from "../../../../common/show-form-error";

// Types
interface ChangeNameProps {
	givenName: string;
	familyName: string;

	isLoading: boolean;
}

interface Inputs {
	givenName: string;
	familyName: string;
}

const ChangeName: React.FC<ChangeNameProps> = (props) => {
	const { givenName, familyName, isLoading } = props;

	const [changeNameShow, setChangeNameShow] = useState<boolean>(false);

	const dispatch = useDispatch();

	const {
		reset,
		register,
		formState: { errors, isDirty },
		handleSubmit,
	} = useForm<Inputs>({
		defaultValues: {
			givenName: givenName,
			familyName: familyName,
		},
	});

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		dispatch(changeNameRequest(data));
	};

	// Reset values (react hook form needs it after loading data from the server)
	useEffect(() => {
		reset({ givenName, familyName });
	}, [givenName, familyName, reset]);

	const handleChangeNameShow = () => {
		setChangeNameShow((prev) => !prev);
		reset({ givenName, familyName });
	};

	return (
		<div className="settings-row">
			<div className="settings-row-title">
				<div>Name</div>
			</div>

			<div className="settings-row-change">
				{!changeNameShow && <span>{`${givenName} ${familyName}`}</span>}
				{changeNameShow && (
					<form className="form-block" onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group">
							<input
								{...register("givenName", givenNameOptions)}
								className="input"
								placeholder="New given name"
								disabled={isLoading}
							/>
							<ShowFormError
								message={errors.givenName?.message}
							/>
						</div>
						<div className="form-group">
							<input
								{...register("familyName", familyNameOptions)}
								className="input"
								placeholder="New family name"
								disabled={isLoading}
							/>
							<ShowFormError
								message={errors.familyName?.message}
							/>
						</div>
						<button disabled={!isDirty || isLoading} className="btn btn-primary">
							{ isLoading ? "Saving..." : "Save" }
						</button>
					</form>
				)}
			</div>

			<div className="settings-row-action">
				<button
					onClick={handleChangeNameShow}
					className="btn-transperent"
				>
					{changeNameShow ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default ChangeName;
