import styles from "./cardReportStyles.module.scss";

export default function (props) {
    const backgroundColor = props.backgroundColor;
    return (
        <div
            className={styles.card}
            style={{ backgroundColor: backgroundColor }}
        >
            <div className={styles.title}>{props?.title}</div>
            <div className={styles.data}>
                <p style={{textAlign: 'center'}}>{props?.data}</p>
            </div>
        </div>
    );
}
