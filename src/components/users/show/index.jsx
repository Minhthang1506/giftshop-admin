import {
    BooleanField,
    DateField,
    EmailField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    SaveButton,
} from "react-admin";

import Divider from "@mui/material/Divider";

import styles from "./showStyles.module.scss";

import { ThumbnailField } from "../fields";

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <ThumbnailField source="imageUrl" />
            <Divider></Divider>
            <TextField source="id" />
            <Divider></Divider>
            <TextField source="firstName" />
            <Divider></Divider>
            <TextField source="lastName" />
            <Divider></Divider>
            <TextField source="address" />
            <Divider></Divider>
            <DateField source="dateOfBirth" />
            <Divider></Divider>
            <TextField source="phoneNumber" />
            <Divider></Divider>
            <EmailField source="email" />
            <Divider></Divider>
            <BooleanField source="isActive" />
            <Divider></Divider>
            <TextField source="role" />
            <Divider></Divider>
            <ReferenceField source="cartId" reference="carts">
                <TextField source="id" />
            </ReferenceField>
            <Divider></Divider>
            <ReferenceField source="wishlistId" reference="wishlists">
                <TextField source="id" />
            </ReferenceField>
            <Divider></Divider>
            <DateField source="createdAt" />
            <Divider></Divider>
            <DateField source="updatedAt" />
            <Divider></Divider>
            <DateField source="lastLogin" />
        </SimpleShowLayout>
    </Show>
);
