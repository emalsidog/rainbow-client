// Dependencies
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Cropper from "react-cropper";

// Actions
import { changePhotoRequest } from "../../../../../redux/user/actions";

// Utils
import { saveImageData } from "../../../../utils/avatar-uploading";

// Styles
import "./change-avatar.css";
import "cropperjs/dist/cropper.css";

// Components
import Modal from "../../../../common/modal";
import DragAndDrop from "../../../../common/drag-and-drop";

// Types
interface ChangeAvatarProps {
	isLoading: boolean;
}

interface ImageData {
	imageUrl: string | undefined;
	imageName: string;
	imageBlob: Blob | string;
}

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ isLoading }) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [imageData, setImageData] = useState<ImageData>({
		imageUrl: undefined,
		imageName: "",
		imageBlob: "",
	});

	const dispatch = useDispatch();

	const openModal = () => {
		setIsVisible(true);
	};

	const closeModal = () => {
		setIsVisible(false);
		setImageData({ imageUrl: undefined, imageName: "", imageBlob: "" });
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;
		if (files && files.length > 0) {
			saveImageData(files[0], setImageData);
		}
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { imageBlob, imageName } = imageData;

		const formData = new FormData();
		formData.append("avatar", imageBlob, imageName);

		dispatch(changePhotoRequest(formData));
		closeModal();
	};

	const cropperRef = useRef<HTMLImageElement>(null);
	const onCrop = () => {
		const imageElement: any = cropperRef?.current;
		const cropper: any = imageElement?.cropper;

		cropper.getCroppedCanvas().toBlob((blob: Blob) => {
			setImageData((prev) => ({ ...prev, imageBlob: blob }));
		});
	};

	return (
		<React.Fragment>
			<div className="settings-row">
				<div className="settings-row-title">
					<div>Change profile photo</div>
				</div>
				<div className="settings-row-change">
					<span>A photo helps personalize your account</span>
				</div>
				<div className="settings-row-action">
					<button onClick={openModal} className="btn-transperent">
						Change
					</button>
				</div>
			</div>
			<Modal
				title="Change profile photo"
				isVisible={isVisible}
				isDisabled={imageData.imageBlob ? false : true}
				isStatic={imageData.imageUrl ? true : false}
				isLoading={isLoading}
				onClose={closeModal}
				onOk={onSubmit}
			>
				{imageData.imageUrl ? (
					<Cropper
						initialAspectRatio={4 / 4}
						aspectRatio={4 / 4}
						zoomable={false}
						viewMode={3}
						src={imageData.imageUrl}
						crop={onCrop}
						ref={cropperRef}
					/>
				) : (
					<form onSubmit={onSubmit} className="change-avatar-from">
						<DragAndDrop setImageData={setImageData}>
							<input
								accept=".png, .jpeg, .jpg"
								onChange={handleOnChange}
								type="file"
								id="upload-input"
							/>
							<div>
								<label htmlFor="upload-input">
									Choose image{" "}
								</label>
								or drag it here
							</div>
						</DragAndDrop>
					</form>
				)}
			</Modal>
		</React.Fragment>
	);
};

export default ChangeAvatar;
