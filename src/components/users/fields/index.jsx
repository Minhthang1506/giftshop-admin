import { useRecordContext } from "react-admin";

import styles from "./fieldStyles.module.scss";

export const ThumbnailField = ({ source }) => {
    const record = useRecordContext();

    return (
        <div
            className={styles.thumbnail}
            style={{ backgroundImage: `url(${record && record[source]})` }}
        >
            <div>{record && !record[source] && "No image"}</div>
        </div>
    );
};

//edit component
