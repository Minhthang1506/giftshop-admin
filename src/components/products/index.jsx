import { TextInput, Datagrid, DateField, List, NumberField, TextField, ShowButton ,EditButton} from 'react-admin';

import {ThumbnailField, TraitsField, DetailField, PriceField} from './fields2'

const ProductShowButton = () => <ShowButton label="Show" />;
const ProductEditButton = () => <EditButton label="Edit" />;

const ProductFilters = [
    <TextInput label="Search" source="q" />,
];

export const ProductList = () => (
    <List filters={ProductFilters} sort={{field: 'price', order: "DESC"}}>
        <Datagrid bulkActionButtons={false} >
            <TextField source="sku" />
            <TextField source="name" />
            <TextField source="description" />
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