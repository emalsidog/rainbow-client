// Dependencies
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

// Styles
import styles from "./modal.module.css";

// Types
interface ModalProps {
	children: React.ReactNode;

	isVisible: boolean;
	title: string;
	isStatic?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	footer?: JSX.Element;

	onClose: () => void;
	onOk?: (e: any) => void;
}

const Modal: React.FC<ModalProps> = (props) => {
	const {
		children,

		isVisible,
		title,
		isLoading,
		isDisabled,

		onClose,
		onOk,
	} = props;

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const { isStatic = false } = props;
		if (!isStatic) {
			const unsubscribe = eventListenters();
			return unsubscribe;
		}
	});

	const eventListenters = () => {
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscQuit);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleEscQuit);
		};
	};

	const handleClickOutside = (event: any): void => {
		if (ref.current && !ref.current.contains(event.target)) {
			onClose();
		}
	};

	const handleEscQuit = (event: KeyboardEvent): void => {
		if (event.key === "Escape") {
			onClose();
		}
	};

	if (!isVisible) {
		return null;
	}

	const defaultFooter = (
		<div style={{ marginLeft: "auto" }}>
			<button
				disabled={isLoading}
				className="btn btn-secondary"
				onClick={onClose}
			>
				Close
			</button>
			<button
				disabled={isLoading || isDisabled}
				className="btn btn-primary"
				onClick={onOk}
			>
				{isLoading ? "Loading..." : "Save"}
			</button>
		</div>
	);

	const { footer } = props;

	return ReactDOM.createPortal(
		<div className={styles.container}>
			<div className={styles.modal} ref={ref}>
				<div className={styles.modalHeader}>
					<span>{title}</span>
					<button
						disabled={isLoading}
						onClick={onClose}
						className="btn-transperent"
					>
						<i
							style={{ color: "black" }}
							className="fas fa-times"
						></i>
					</button>
				</div>
				<div className={styles.modalContent}>{children}</div>
				<div className={styles.modalFooter}>
					{footer ? footer : defaultFooter}
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
