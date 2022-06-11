// import {
//     ArrayField,
//     BooleanField,
//     ChipField,
//     Datagrid,
//     DateField,
//     List,
//     NumberField,
//     SingleFieldList,
//     TextField,
//     TextInput,
// } from "react-admin";
// import {useEffect, useState} from 'react'

// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import Divider from "@mui/material/Divider";

// import styles from "./couponStyles.module.scss";

// import {GenerateCode} from './helper'

// export const CouponList = (props) => {
//     return (
//         <List>
//             <Datagrid expand={<Expand />} rowClick="edit">
//                 <TextField source="id" />
//                 <TextField source="name" />
//                 <NumberField source="percent" />
//                 <DateField source="startAt" />
//                 <DateField source="endAt" />
//                 <NumberField source="amount" />
//             </Datagrid>
//         </List>
//     );
// };

// export const Expand = ({ record, id, resource }) => {

//     const [prefix, setPrefix] = useState('')
//     const [codeList, setCodeList] = useState(record?.list)

//     const changeHandler = (e) => setPrefix(e.target.value)

//     const handleGenerateClick = () => {
//         if(codeList?.length === 0) {
//             const codesGenerated = GenerateCode(prefix, record?.amount)
//             setCodeList(codesGenerated)
//         }
//     }

//     return (
//         <div className={styles.panel}>
//             <div className={styles.generate_area}>
//                 <div
//                 onClick={handleGenerateClick}
//                     className={
//                         styles[
//                             `generate${
//                                 codeList?.length !== 0 ? `__disable` : ""
//                             }`
//                         ]
//                     }
//                 >
//                     Generate coupon code
//                 </div>
//                 <label htmlFor="prefix" className = {styles.label}>Prefix</label>
//                 <input value={prefix} onChange={changeHandler} type="text" className = {styles.input}></input>
//             </div>
//             <Header></Header>
//             {codeList && 
//                 codeList.map((item, idx) => (
//                     <Row key={idx} record={item}></Row>
//                 ))}
//         </div>
//     );
// };

// const Row = ({ record }) => {
//     const iconStyles = {
//         available: {
//             backgroundColor: "green",
//             padding: "2px",
//             borderRadius: "2px",
//             color: "white",
//         },
//         used: {
//             backgroundColor: "rgb(139, 50, 50)",
//             padding: "2px",
//             borderRadius: "2px",
//             color: "white",
//         },
//     };

//     return (
//         <div className={styles.table__row}>
//             <div className={styles.id}>{record.id}</div>
//             <div className={styles.code}>{record.code}</div>
//             <div className={styles.isUsed}>
//                 {!record.isUsed ? (
//                     <CheckIcon style={iconStyles.available} />
//                 ) : (
//                     <CloseIcon style={iconStyles.used} />
//                 )}
//             </div>
//         </div>
//     );
// };

// const Header = () => {
//     return (
//         <>
//             <div className={styles.table__header}>
//                 <div className={styles.id}>Id</div>
//                 <div className={styles.code}>Generate code</div>
//                 <div className={styles.isUsed}>Available</div>
//             </div>
//             <Divider></Divider>
//         </>
//     );
// };


import { BooleanField, Datagrid, DateField, List, NumberField, TextField } from 'react-admin';
import { TextInput } from 'react-admin';

const couponFilters = [
    //<TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Event Code" source="eventCode" defaultValue="" />,
];

export const CouponList = () => (
    <List filters={couponFilters} sort={{field: 'discountPercent', order: "DESC"}}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="eventCode" />
            <NumberField source="discountPercent" />
            <DateField source="validFrom" />
            <DateField source="validTo" />
            <DateField source="createdAt" />
        </Datagrid>
    </List>
);