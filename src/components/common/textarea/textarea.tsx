// Dependencies
import React from "react";

// Types
export interface TextAreaOptions {
	rows: number;
	minRows: number;
	maxRows: number;
	charactersLimit: number;
	value: string;
}

interface TextareaProps {
	isLoading?: boolean;
	autoFocus?: boolean;
	placeholder?: string;

	textareaOptions: TextAreaOptions;
	setTextareaOptions: (prev: any) => any;

	onEnter?: () => void;
}

const Textarea: React.FC<TextareaProps> = (props) => {
	const { textareaOptions, isLoading } = props;

	// Handle changing textarea
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const { setTextareaOptions } = props;

		// Do not write value, if bio is already 100 characters long
		if (e.target.value.length > textareaOptions.charactersLimit) return;

		const textareaLineHeight = 24;
		const { minRows, maxRows } = textareaOptions;

		const previousRows = e.target.rows;
		e.target.rows = minRows;

		const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

		if (currentRows === previousRows) {
			e.target.rows = currentRows;
		}

		if (currentRows >= maxRows) {
			e.target.rows = maxRows;
			e.target.scrollTop = e.target.scrollHeight;
		}

		// Set new text area options
		setTextareaOptions((prev) => ({
			...prev,
			rows: currentRows < maxRows ? currentRows : maxRows,
			value: e.target.value,
		}));
	};

	// Handle key down
	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	): void => {
		const { onEnter } = props;

		if (onEnter && e.key === "Enter") {
			e.preventDefault();
			onEnter();
		}
	};

	const { autoFocus = false, placeholder } = props;

	return (
		<textarea
			className="textarea"
			rows={textareaOptions.rows}
			value={textareaOptions.value}
			placeholder={placeholder}
			disabled={isLoading}
			autoFocus={autoFocus}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default Textarea;
