import { ShowButton, DeleteButton, TextInput,BooleanField, Datagrid, DateField, EmailField, List, ReferenceField, TextField } from 'react-admin';

import {ThumbnailField} from './fields'

const userFilters = [
    //<TextInput label="Search" source="q" alwaysOn />,
    <TextInput label="Email" source="email" defaultValue="" />,
];

const UserShowButton = () => <ShowButton label="Show" />;

const UserDeleteButton = () => <DeleteButton label="Delete" />;

export const UserList = () => (
    <List filters={userFilters} sort={{field: 'createdAt', order: "DESC"}}>
        <Datagrid>
            <TextField source="id" />
            <DateField source="firstName" />
            <TextField source="lastName" />
            <DateField source="dateOfBirth" />
            <TextField source="phoneNumber" />
            <TextField source="address" />
            <DateField source="createdAt" />
            <EmailField source="email" />
            <TextField source="role" />
            <ThumbnailField source="imageUrl" />
            <UserShowButton></UserShowButton>
            <UserDeleteButton></UserDeleteButton>
        </Datagrid>
    </List>
);