import {
    BooleanField,
    DateField,
    NumberField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

import styles from "./showStyles.module.scss";

import {
    ThumbnailField,
    DetailField,
    TraitsField,
    PriceField,
    DiscriptionField
} from "../fields2";
import { MyImageField } from "../fields";

import Divider from "@mui/material/Divider";

export const ProductShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="sku" />
            <Divider></Divider>
            <MyImageField source="image" />
            <Divider></Divider>
            <BooleanField source="isActive"></BooleanField>
            <Divider></Divider>
            <TextField source="name" />
            <Divider></Divider>
            <DiscriptionField words={1000} source="description" />
            <Divider></Divider>
            <NumberField source="stock" />
            <Divider></Divider>
            <PriceField source="price" />
            <Divider></Divider>
            <DetailField source="detail" />
            <Divider></Divider>
            <TraitsField source="traits" />
            <Divider></Divider>
        </SimpleShowLayout>
    </Show>
);
