// Dependencies
import React, { forwardRef } from "react";

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
	classNames?: string;

	textareaOptions: TextAreaOptions;
	setTextareaOptions: (prev: any) => any;

	handleKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(props, ref) => {
		const { textareaOptions, isLoading } = props;

		// Handle changing textarea
		const handleChange = (
			e: React.ChangeEvent<HTMLTextAreaElement>
		): void => {
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

		const {
			autoFocus = false,
			placeholder,
			classNames = "textarea",
			handleKeyDown,
		} = props;

		return (
			<textarea
				className={classNames}
				rows={textareaOptions.rows}
				value={textareaOptions.value}
				placeholder={placeholder}
				disabled={isLoading}
				autoFocus={autoFocus}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				ref={ref}
			/>
		);
	}
);

export default Textarea;
