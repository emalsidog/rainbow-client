// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// Actions
import { changeBirthdayRequest } from "../../../../../redux/user/actions";

// Utils
import { formatDate } from "../../../../utils/format-date";

// Types
interface ChangeBirthdayProps {
	isLoading: boolean;
	birthday: Date | undefined;
}

interface DateState {
	month: number;
	day: string;
	year: string;
}

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const ChangeBirthday: React.FC<ChangeBirthdayProps> = (props) => {
	const { isLoading, birthday } = props;

	const [changeBirthdayShow, setChangeBirthdayShow] = useState<boolean>(false);
	const [isTheSame, setIsTheSame] = useState<boolean>(false);
	const [date, setDate] = useState<DateState>({
		month: 0,
		day: "",
		year: "",
	});

	// Saving old birthday to compare it later
	const oldBirthday = useRef<DateState>({ ...date });

	const dispatch = useDispatch();

	// Display form or not
	const handleChangeBirthdayShow = (): void => {
		setChangeBirthdayShow((prev) => !prev);
		setDate({ ...oldBirthday.current })
	};

	// Change month
	const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		setDate((prev) => ({ ...prev, month: parseInt(e.target.value) }));
	};

	// Change day
	const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const day: string = e.target.value;
		if (!checkString(day, 2)) return;

		setDate((prev) => ({ ...prev, day: day }));
	};

	// Change year
	const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const year: string = e.target.value;
		if (!checkString(year, 4)) return;

		setDate((prev) => ({ ...prev, year: year }));
	};

	// Handle submit
	const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		dispatch(changeBirthdayRequest(date));
	};

	// Helper function
	const checkString = (string: string, stringLeangth: number): boolean => {
		if (string.match(/^0|[^\d]/g)) return false;
		if (string.length > stringLeangth) return false;
		return true;
	};

	// Load all data, when it was received
	useEffect(() => {
		if (birthday) {
			const birthdayDate = new Date(birthday);
			const date: DateState = {
				month: birthdayDate.getMonth(),
				day: birthdayDate.getDate().toString(),
				year: birthdayDate.getFullYear().toString(),
			};

			oldBirthday.current = { ...date };
			setIsTheSame(true);
			return setDate({ ...date });
		}
	}, [birthday]);

	// Compare new date with old date in order to disable or not button
	useEffect(() => {
		if (JSON.stringify(date) === JSON.stringify(oldBirthday.current)) {
			return setIsTheSame(true);
		}
		setIsTheSame(false);
	}, [date]);

	// Rendering options
	const renderMonthsOptions = months.map((month, index) => (
		<option value={index} key={month}>
			{month}
		</option>
	));

	return (
		<div className="settings-row">
			<div className="settings-row-title">
				<div>Birthday</div>
			</div>

			<div className="settings-row-change">
				{!changeBirthdayShow && (
					<span>
						{birthday ? formatDate(birthday, "BIRTHDAY") : "Not specified"}
					</span>
				)}
				{changeBirthdayShow && (
					<form onSubmit={handleOnSubmit}>
						<div className="form-group">
							<select
								className="select"
								defaultValue={date.month}
								onChange={handleChangeMonth}
								disabled={isLoading}
							>
								{renderMonthsOptions}
							</select>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="input"
								placeholder="Day"
								value={date.day}
								onChange={handleChangeDay}
								disabled={isLoading}
							/>
						</div>
						<div className="form-group">
							<input
								type="text"
								className="input"
								placeholder="Year"
								value={date.year}
								onChange={handleChangeYear}
								disabled={isLoading}
							/>
						</div>
						<button
							disabled={isTheSame || isLoading}
							className="btn btn-primary"
						>
							{isLoading ? "Saving..." : "Save"}
						</button>
					</form>
				)}
			</div>

			<div className="settings-row-action">
				<button
					onClick={handleChangeBirthdayShow}
					className="btn-transperent"
				>
					{changeBirthdayShow ? "Cancel" : "Change"}
				</button>
			</div>
		</div>
	);
};

export default ChangeBirthday;
