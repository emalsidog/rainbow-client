// Dependencies
import React from "react";

// Styles
import "./section-heading.css";

// Types
interface SectionHeadingProps {
	title: string;
	description: string;
	anchor: string;
	displayStyle: Style;

	isFirst?: boolean;
}

type Style = "DEFAULT" | "DANGER";

const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
	const { title, description, displayStyle, anchor, isFirst = false } = props;

	let classNames: string = configureStyling(displayStyle, isFirst);

	return (
		<div id={anchor} className={classNames}>
			<span>{title}</span>
			<p>{description}</p>
		</div>
	);
};

const configureStyling = (displayStyle: Style, isFirst: boolean): string => {
	let classNames: string = "section-heading ";

	if (!isFirst) {
		classNames += "top ";
	}

	switch (displayStyle) {
		case "DANGER":
			return (classNames += "danger");
		default:
			return classNames;
	}
};

export default SectionHeading;
