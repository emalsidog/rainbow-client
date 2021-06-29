// Dependencies
import React from "react";

// Styles
import styles from "./search-panel.module.css";

// Components
import Spinner from "../../../../common/spinner";

// Types
interface SearchPanelProps {
    isLoading: boolean;
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = (props) => {
    const { isLoading , value, handleChange} = props;

    return (
        <div className={`input-group ${styles.searchBox}`}>
        <span>
            {isLoading ? (
                <Spinner />
            ) : (
                <i className="fas fa-search"></i>
            )}
        </span>
        <input
            value={value}
            onChange={handleChange}
            placeholder="Search by name..."
            autoFocus
        />
    </div>
    )
}

export default SearchPanel;