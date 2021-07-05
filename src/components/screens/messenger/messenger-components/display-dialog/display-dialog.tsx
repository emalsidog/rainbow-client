// Dependencies
import React from "react";

// Styles
import styles from "./display-dialog.module.css";

// Types
interface DisplayDialogProps {
    avatar: string;
    givenName: string;
    familyName: string;
}

const DisplayDialog: React.FC<DisplayDialogProps> = (props) => {
    const { avatar, givenName, familyName } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img alt="" src={avatar} />
            </div>
            <div>
                <div>{`${givenName} ${familyName}`}</div>
                <div className={styles.message}>online</div>
            </div>
        </div>
    )
}

export default DisplayDialog;