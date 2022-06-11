import { useRecordContext } from "react-admin";

import styles from "./fieldStyles.module.scss";

import {CapitalizeFirstLetter} from '../../../utils/capitalizeString'

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

export const PriceField = ({ source }) => {
    const record = useRecordContext();
    return (
        <div className = {styles.text}>{record && record[source]} VNĐ</div>
    );
};

//edit component
