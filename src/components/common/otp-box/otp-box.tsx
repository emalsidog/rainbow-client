// Dependencies
import React, { useEffect, useRef } from "react";

// Styles
import "./otp-box.css";

// Types
interface OtpBoxProps {
	otp: string[];
	setOtp: (otp: string[]) => void;
	onSubmit?: () => void;
}

const OtpBox: React.FC<OtpBoxProps> = (props) => {
	const { otp, setOtp } = props;

	// Create array of refs (for each input)
	let refs = useRef<Array<HTMLInputElement | null>>([]);
	useEffect(() => {
		refs.current = refs.current.slice(0, otp.length);
	}, [otp]);

	// Handle change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		if (!e.target.value.match(/[0-9]/g) || e.target.value === "") return false;
		if (e.target.value.length > 1) return false;

		setOtp([
			...otp.map((value, idx) =>
				idx === index ? e.target.value : value
			),
		]);

		if (refs.current[index + 1]) {
			refs.current[index + 1]?.focus();
		}
	};

	// Handle keydown
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
		switch (e.key) {
			// Clear current and jump on previous
			case "Backspace": {
				setOtp([
					...otp.map((value, idx) => (idx === index ? "" : value)),
				]);
				return (
					refs.current[index - 1] && refs.current[index - 1]?.focus()
				);
			}

			// Submit
			case "Enter": {
				const { onSubmit } = props;
				return onSubmit && onSubmit();
			}
		}

		if (refs.current[index]?.value) {
			return refs.current[index + 1] && refs.current[index + 1]?.focus();
		}
	};

	return (
		<div className="otpbox-container">
			{otp.map((value, index) => {
				return (
					<input
						ref={(el) => (refs.current[index] = el)}
						className="otpbox-input"
						key={index}
						value={value}
						onChange={(e) => handleChange(e, index)}
						onKeyDown={(e) => handleKeyDown(e, index)}
						autoFocus={index === 0}
						type="number"
					/>
				);
			})}
		</div>
	);
};

export default OtpBox;
