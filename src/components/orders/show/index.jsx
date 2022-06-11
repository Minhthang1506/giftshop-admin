import {
    ArrayField,
    BooleanField,
    Datagrid,
    DateField,
    NumberField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

import { ThumbnailField, PriceField } from "../fields";

import Divider from '@mui/material/Divider'

export const OrderShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <Divider></Divider>
            <TextField source="userEmail" />
            <Divider></Divider>
            <TextField source="address" />
            <Divider></Divider>
            <ArrayField source="items">
                <Datagrid sx={{padding: "0 20px"}} bulkActionButtons={false}>
                    <TextField source="productSku" />
                    <PriceField source="price" />
                    <NumberField source="quantity" />
                    <TextField source="name" />
                    <ThumbnailField source="imageUrl" />
                </Datagrid>
            </ArrayField>
            <Divider></Divider>
            <DateField source="promotionPercent" />
            <Divider></Divider>
            <PriceField source="totalPrice" />
            <Divider></Divider>
            <PriceField source="totalPaid" />
            <Divider></Divider>
            <TextField source="status" />
            <Divider></Divider>
            <BooleanField source="isPaid" />
            <Divider></Divider>
            <DateField source="createdAt" />
            <Divider></Divider>
            <DateField source="checkoutAt" />
        </SimpleShowLayout>
    </Show>
);
