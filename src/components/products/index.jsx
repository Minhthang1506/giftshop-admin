import {
    TextInput,
    Datagrid,
    DateField,
    List,
    NumberField,
    TextField,
    ShowButton,
    EditButton,
    SelectInput,
    BooleanField
} from "react-admin";

import {
    ThumbnailField,
    TraitsField,
    DetailField,
    PriceField,
    DiscriptionField
} from "./fields2";

const ProductShowButton = () => <ShowButton label="Show" />;
const ProductEditButton = () => <EditButton label="Edit" />;

const ProductFilters = [
    <TextInput label="Search" source="q" />,
    <SelectInput
        label="Active Status"
        choices={[
            { id: 1, value: "True" },
            { id: 2, value: "False" },
            { id: 3, value: "All" },
        ]}
        optionText="value"
        optionValue="value"
        source="isActive"
    ></SelectInput>,
];

export const ProductList = () => (
    <List filters={ProductFilters} sort={{ field: "price", order: "DESC" }}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="sku" />
            <TextField source="name" />
            <BooleanField source="isActive"></BooleanField>
            <DiscriptionField words={100} source="description" />
            <NumberField source="stock" />
            <PriceField source="price" />
            <DetailField source="detail" />
            <TraitsField source="traits" />
            <ThumbnailField source="imageUrl" />
            <ProductShowButton></ProductShowButton>
            <ProductEditButton></ProductEditButton>
        </Datagrid>
    </List>
);

export default ProductList;
