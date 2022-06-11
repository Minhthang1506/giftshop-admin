import { useRecordContext } from "react-admin";

import styles from "./fieldStyles.module.scss";

import { CapitalizeFirstLetter } from "../../../utils/capitalizeString";

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

export const TraitsField = ({ source }) => {
    const record = useRecordContext();
    return (
        <div className = {styles.text}>{record && CapitalizeFirstLetter(record[source]?.join(", "))}</div>
    );
};

export const DetailField = (props) => {
    const record = useRecordContext(props);
    const detail = getDetailProperties(record?.detail);
    const keys = Object.keys(detail).filter((key) => detail?.[key]);

    return (
        <div className={styles.detail__field}>
            {keys &&
                keys.map((key, idx) => (
                    <div className = {styles.text} key={idx}>
                        {`${key.toUpperCase()}: ${detail?.[key]}`}
                    </div>
                ))}
        </div>
    );
};

export const PriceField = ({ source }) => {
    const record = useRecordContext();
    return (
        <div className = {styles.text}>{record && record[source]} VNĐ</div>
    );
};
//edit component
//----------------------------------------------------------------
//helper
const getDetailProperties = (detail) => {
    if (detail) {
        var result = {};
        for (var key in detail) {
            if (detail[key]) result[key] = detail[key];
        }
        return result;
    } else {
        return {};
    }
};
