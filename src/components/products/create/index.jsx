// import { Create, SimpleForm } from "react-admin";
// import { useNavigate } from "react-router-dom";

// import styles from "./createStyles.module.scss";

// import { useDispatch, useSelector } from "react-redux";
// import { changeInvalidate , changeNewSku} from "../productSlice";
// import AjaxHelper from "../../../services";

// import {
//     DetailInput,
//     TextInput,
//     NumberInput,
//     MySelectArrayInput,
//     MyBooleanInput,
//     TextAreaInput,
//     MyCreateImageInput,
//     CreateTextInput
// } from "../fields";

// const choices = [
//     { id: 1, value: "gift" },
//     { id: 2, value: "friend" },
//     { id: 3, value: "demo" },
//     { id: 4, value: "family" },
// ];

// export const ProductCreate = (props) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const newSku = useSelector(state => state.products.newSkU)
//     const imageUrl = useSelector(state => state.products)?.imageUrl

//     const handleSubmit = async (data) => {

//         data.sku = newSku;
//         data.imageUrl = imageUrl;
//         if (!data?.sku) {
//             dispatch(
//                 changeInvalidate({
//                     validateHelper: {
//                         isValid: false,
//                         message: "Sku is required",
//                     },
//                 })
//             );
//             setTimeout(() => {
//                 dispatch(
//                     changeInvalidate({
//                         validateHelper: { isValid: true, message: "" },
//                     })
//                 );
//             }, 1500);
//             return;
//         } else {
//             try {
//                 const result = await AjaxHelper.getOne("products", {
//                     id: data?.sku,
//                 });
//                 dispatch(
//                     changeInvalidate({
//                         validateHelper: {
//                             isValid: false,
//                             message: "Sku is existed",
//                         },
//                     })
//                 );
//                 setTimeout(() => {
//                     dispatch(
//                         changeInvalidate({
//                             validateHelper: { isValid: true, message: "" },
//                         })
//                     );
//                 }, 1500);
//                 return;
//             } catch (err) {
//                 if (err.response.status !== 400) {
//                     dispatch(
//                         changeInvalidate({
//                             validateHelper: {
//                                 isValid: false,
//                                 message: err.message,
//                             },
//                         })
//                     );
//                     setTimeout(() => {
//                         dispatch(
//                             changeInvalidate({
//                                 validateHelper: { isValid: true, message: "" },
//                             })
//                         );
//                     }, 1500);
//                 }
//             }
//         }
//         if (!data?.name) {
//             dispatch(
//                 changeInvalidate({
//                     validateHelper: {
//                         isValid: false,
//                         message: "Name is required",
//                     },
//                 })
//             );
//             setTimeout(() => {
//                 dispatch(
//                     changeInvalidate({
//                         validateHelper: { isValid: true, message: "" },
//                     })
//                 );
//             }, 1500);
//             return;
//         }
//         if (!data?.stock) {
//             dispatch(
//                 changeInvalidate({
//                     validateHelper: {
//                         isValid: false,
//                         message: "Stock is required",
//                     },
//                 })
//             );
//             setTimeout(() => {
//                 dispatch(
//                     changeInvalidate({
//                         validateHelper: { isValid: true, message: "" },
//                     })
//                 );
//             }, 1500);
//             return;
//         }
//         if (!data?.price) {
//             dispatch(
//                 changeInvalidate({
//                     validateHelper: {
//                         isValid: false,
//                         message: "Price is required",
//                     },
//                 })
//             );
//             setTimeout(() => {
//                 dispatch(
//                     changeInvalidate({
//                         validateHelper: { isValid: true, message: "" },
//                     })
//                 );
//             }, 1500);
//             return;
//         }
//         await AjaxHelper.create("products", { id: data.sku, data });
//         dispatch(changeNewSku(''))
//         navigate("/products");
//     };
//     return (
//         <Create {...props}>
//             <SimpleForm onSubmit={handleSubmit}>
//                 <div className={styles.box}>
//                     <div className={styles.grid}>
//                         <CreateTextInput
//                             source="sku"
//                         />
//                         <TextInput source="name" />
//                         <TextAreaInput source="description" />
//                         <NumberInput source="stock" />
//                         <NumberInput source="price" />
//                         <MySelectArrayInput source="traits" choices={choices} />
//                         <MyBooleanInput source="isActive" />
//                     </div>

//                     <div className={styles.grid}>
//                         <DetailInput source="detail"></DetailInput>
//                         <MyCreateImageInput source="imageUrl" />
//                     </div>
//                 </div>
//             </SimpleForm>
//         </Create>
//     );
// };

import {
    SaveButton,
    Edit,
    NumberInput,
    SimpleForm,
    TextInput,
    Toolbar,
    BooleanInput,
    SelectArrayInput,
    Create,
    useCreate,
} from "react-admin";

import { RichTextInput, RichTextInputToolbar } from "ra-input-rich-text";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./createStyles.module.scss";

import AjaxHelper from "../../../services";
import { CheckValidateCode } from "../../../utils/checkValidateCode";
import { URL_DOMAIN_V1 } from "../../../services/API";

const choices = [
    { id: 1, value: "Gia đình" },
    { id: 2, value: "Bạn bè" },
    { id: 3, value: "Đề xuất" },
    { id: 4, value: "Tình yêu" },
    { id: 5, value: "Lưu niệm" },
];

export const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Save" />
    </Toolbar>
);

const required = (source) => (value) =>
    value ? undefined : `This ${source} is required.`;

const unExists = async (allValues) => {
    try {
        var data = await AjaxHelper.getOne("products", { id: allValues });
        if (data) {
            return "This Sku is existed.";
        }
    } catch (e) {
        return undefined;
    }
};

const codeValid =
    (message = "The Sku only contain numbers and letters.") =>
    (value) =>
        CheckValidateCode(value) ? undefined : message;

const minPrice =
    (min, message = "The Price must greater 0.") =>
    (value) =>
        value && value <= min ? message : undefined;

const minStock =
    (min, message = "The Stock must greater 0.") =>
    (value) =>
        value && value <= min ? message : undefined;

const validateSku = [required("Sku"), codeValid(), unExists];
const validateName = [required("Name")];
const validatePrice = [required("Price"), minPrice(0)];
const validateStock = [required("Stock"), minStock(0)];

export const ProductCreate = (props) => {
    const navigate = useNavigate()
    const [skuCreate, setSkuCreate] = useState("");

    const handleSubmit = async (data) => {
        try {
            var result = await AjaxHelper.create("products", { data });
            var sku = result?.data?.sku;

            setSkuCreate(sku);
            setTimeout(() => {
                navigate('/products')
            }, 3000)
        } catch (e) {
            throw new Error();
        }
    };

    return (
        <Create {...props}>
            <SimpleForm
                onSubmit={handleSubmit}
                toolbar={<MyToolbar></MyToolbar>}
            >
                <TextInput source="sku" validate={validateSku} />
                <TextInput source="name" validate={validateName} />
                <MyImageField source="image" sku={skuCreate}></MyImageField>
                <RichTextInput
                    source="description"
                    toolbar={<RichTextInputToolbar size="large" />}
                />
                <NumberInput source="stock" validate={validateStock} />
                <NumberInput source="price" validate={validatePrice} />
                <SelectArrayInput
                    source="traits"
                    choices={choices}
                    optionText="value"
                    optionValue="value"
                />
                <BooleanInput source="isActive" />
                <TextInput source="detail.color" label="Color" />
                <TextInput source="detail.size" label="Size" />
                <TextInput source="detail.material" label="Material" />
                <TextInput source="detail.weight" label="Weight" />
                <TextInput source="detail.dimention" label="Dimension" />
            </SimpleForm>
        </Create>
    );
};

export const MyImageField = ({ sku }) => {
    const [file, setFile] = useState();
    const [disableClass, setDisableClass] = useState("__disable");

    const handleSelectFile = (e) => {
        setFile(e.target.files?.[0]);
    };

    const handleRemove = (e) => setFile();
    const handleUpdate = async () => {
        if (!sku || file === undefined) {
            return
        };

        setDisableClass("__disable");
        const formData = new FormData();
        formData.append("File", file);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        const result =
            file &&
            (await axios.post(
                `${URL_DOMAIN_V1}/Images/upload/product/${sku}`,
                formData,
                config
            ));
    };

    useEffect(() => {
        setDisableClass("");
    }, [file]);

    useEffect(() => {
        handleUpdate();
    }, [sku]);

    return (
        <div className={styles.field}>
            <div
                className={styles.input__image}
                style={{
                    backgroundImage: `url(${file && URL.createObjectURL(file)}`,
                }}
            >
                <div className={styles.layout}></div>
                <div className={styles.icon}>
                    <EditIcon sx={{ fontSize: 24, color: "white" }}></EditIcon>
                </div>
                <input
                    className={styles.img}
                    type="file"
                    onChange={handleSelectFile}
                    accept="image/*"
                />
            </div>
            <div
                className={styles[`btn${disableClass}`]}
                onClick={disableClass === "" ? handleRemove : undefined}
            >
                Remove image
            </div>
        </div>
    );
};
