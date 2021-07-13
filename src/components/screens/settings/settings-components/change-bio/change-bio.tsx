// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// Actions
import { changeBioRequest } from "../../../../../redux/user/actions";

// Components
import Textarea from "../../../../common/textarea";

// Types
import { TextAreaOptions } from "../../../../common/textarea/textarea";

interface ChangeBioProps {
	isLoading: boolean;
	bio: string;
}

const ChangeBio: React.FC<ChangeBioProps> = (props) => {
	const { isLoading, bio } = props;

	// Handle show form or not
	const [changeBioShow, setChangeBioShow] = useState<boolean>(false);

	// Available characters
	const [availableCharacters, setAvailableCharacters] = useState<number>(0);

	// Disable button if this value is true
	const [isTheSame, setIsTheSame] = useState<boolean>(true);

	// Text area options
	const [textareaOptions, setTextareaOptions] = useState<TextAreaOptions>({
		rows: 2,
		minRows: 2,
		maxRows: 10,
		charactersLimit: 100,
		value: "",
	});

	const dispatch = useDispatch();

	// Ref to save the value of old bio
	const oldBio = useRef(bio);

	// Set initial values after bio was loaded
	useEffect(() => {
		oldBio.current = bio;

		setIsTheSame(true);
		setAvailableCharacters(100 - bio.length);
		setTextareaOptions((prev) => ({ ...prev, value: bio }));
	}, [bio]);

	useEffect(() => {
		setAvailableCharacters(100 - textareaOptions.value.length);

		if (textareaOptions.value !== oldBio.current) {
			setIsTheSame(false);
		} else {
			setIsTheSame(true);
		}
	}, [textareaOptions.value.length, textareaOptions.value]);

	// Helper. Add '...' to the end if bio is too long (> 35 characters)
	const formatBio = (bio: string): string => {
		if (bio.length > 35) {
			return bio.slice(0, 35) + "...";
		}

		if (bio.length === 0) {
			return "Not specified";
		}

		return bio;
	};

	// Handle showinf form to change bio
	const handleChangeBioShow = (): void => {
		setChangeBioShow((prev) => !prev);

		setIsTheSame(true);
		setAvailableCharacters(100 - bio.length);
		setTextareaOptions((prev) => ({ ...prev, value: bio }));
	};

	// Handle enter click (textarea)
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	): void => {
		if (e.key === "Enter") {
			e.preventDefault();
			!isTheSame && dispatch(changeBioRequest(textareaOptions.value));
		}
	};

	// Handle form submit
	const handleSubmit = (e: React.FormEvent): void => {
		e.preventDefault();
		dispatch(changeBioRequest(textareaOptions.value));
	};

	return (
		<div className="settings-row">
			<div className="settings-row-title">
				<div>Bio</div>
			</div>

			<div className="settings-row-change">
				{!changeBioShow && <span>{formatBio(bio)}</span>}
				{changeBioShow && (
					<form className="form-block">
						<div className="form-group" onSubmit={handleSubmit}>
							<Textarea
								placeholder="Enter your text here or leave it empty..."
								isLoading={isLoading}
								textareaOptions={textareaOptions}
								setTextareaOptions={setTextareaOptions}
								handleKeyDown={handleKeyDown}
							/>
						</div>
						<div className="form-group">
							<i>Characters left: {availableCharacters}</i>
						</div>
						<button
							disabled={isTheSame || isLoading}
							onClick={handleSubmit}
							className="btn btn-primary"
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</form>
				)}
			</div>

			<div className="settings-row-action">
				<button
					onClick={handleChangeBioShow}
					className="btn-transperent"
				>
					{changeBioShow ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default ChangeBio;
