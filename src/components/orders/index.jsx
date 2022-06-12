import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    List,
    NumberField,
    SingleFieldList,
    TextField,
    TextInput,
} from "react-admin";

import { ShowButton, EditButton } from "react-admin";

import {PriceField} from './fields'

const OrderShowButton = () => <ShowButton label="Show" />;
const OrderEditButton = () => <EditButton label="Edit" />;

const ordersFilters = [
    //<TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="User Email" source="userEmail" defaultValue="" />,
    <TextInput label="Status" source="status" defaultValue="" />,
];

export const OrderList = () => (
    <List filters={ordersFilters} sort={{field: 'createdAt', order: "DESC"}}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="id" />
            <TextField source="userEmail" />
            {/* <ArrayField source="items">
                <SingleFieldList>
                    <ChipField source="productSku" />
                </SingleFieldList>
            </ArrayField> */}
            <NumberField source="promotionPercent" />
            <PriceField source="totalPrice" />
            <PriceField source="totalPaid" />
            <BooleanField source="isPaid" />
            <TextField source="status" />
            <TextField source="address" />
            <DateField source="createdAt" />
            <OrderShowButton></OrderShowButton>
            <OrderEditButton></OrderEditButton>
        </Datagrid>
    </List>
);
