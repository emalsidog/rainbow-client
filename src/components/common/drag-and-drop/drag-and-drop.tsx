// Dependencies
import React, { useState } from "react";

// Utils
import { saveImageData } from "../../utils/avatar-uploading";

// Assets
import upload from "../../../assets/images/upload.svg";

// Styles
import "./drag-and-drop.css";

// Types
interface DragAndDropProps {
	setImageData: (prev: any) => void;
	children?: React.ReactNode;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ setImageData, children }) => {
	const [dropDepth, setDropDepth] = useState<number>(0);
	const [isInDropZone, setIsInDropZone] = useState<boolean>(false);

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			saveImageData(files[0], setImageData);

			e.dataTransfer.clearData();
			setDropDepth(0);
			setIsInDropZone(false);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		e.dataTransfer.dropEffect = "copy";
		setIsInDropZone(true);
	};

	const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setDropDepth((prev) => prev + 1);
	};

	const handeDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setDropDepth((prev) => prev - 1);
		if (dropDepth > 1) return;
		setIsInDropZone(false);
	};

	return (
		<div
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragEnter={handleDragEnter}
			onDragLeave={handeDragLeave}
			className={ isInDropZone ? "drag-and-drop inside" : "drag-and-drop" }
		>
			<img src={upload} style={{ width: "200px" }} alt="" />
			{children}
		</div>
	);
};

export default DragAndDrop;
