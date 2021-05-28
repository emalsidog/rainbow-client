// Dependencies
import React from "react";

// Types
interface ShowFormErrorProps {
    message: string | undefined
}

const ShowFormError: React.FC<ShowFormErrorProps> = ({ message }) => {
    if (message) {
        return <span className="form-error">{message}</span>
    }
    return null;
}

export default ShowFormError;