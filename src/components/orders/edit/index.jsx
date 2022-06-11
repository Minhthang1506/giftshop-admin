import {
    ArrayInput,
    BooleanInput,
    DateInput,
    Edit,
    NumberInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    useGetOne,
    SelectInput,
    Toolbar,
    SaveButton,
} from "react-admin";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const statusStragety = [
    {
        curStatus: "Pending",
        nextStatus: [
            { id: 1, status: "Delivered" },
            { id: 2, status: "Canceled" },
        ],
    },
    {
        curStatus: "Delivered",
        nextStatus: [
            { id: 1, status: "Success" },
            { id: 2, status: "Canceled" },
        ],
    },
    { curStatus: "Success", nextStatus: [{ id: 1, status: "Success" }] },
    {
        curStatus: "Canceled",
        nextStatus: [
            { id: 1, status: "Canceled" },
            { id: 2, status: "Success" },
        ],
    },
];

const getChoices = (curStatus) => {
    return statusStragety.find((status) => status.curStatus === curStatus)
        .nextStatus;
};

const validateOrderStatusEdit = (values) => {
    const errors = {};
    //status
    if (!values.status) {
        errors.status = "The Status is required.";
    }

    return errors;
};

const MyToolbar = () => (
    <Toolbar>
        <SaveButton label="Save" />
    </Toolbar>
);

export const OrderEdit = () => {
    const [choices, setChoices] = useState([{ id: "", value: "" }]);

    const { id } = useParams();
    const { reset } = useForm();
    const { isLoading } = useGetOne(
        "orders",
        { id },
        {
            onSuccess: (data) => {
                const newChoices = getChoices(data.status);
                setChoices(newChoices);

                reset(data);
            },
        }
    );

    if (isLoading) {
        return null;
    }
    return (
        <Edit>
            <SimpleForm
                validate={validateOrderStatusEdit}
                toolbar={<MyToolbar></MyToolbar>}
            >
                <SelectInput
                    source="status"
                    choices={choices}
                    emptyText=""
                    emptyValue=""
                    optionText="status"
                    optionValue="status"
                />
            </SimpleForm>
        </Edit>
    );
};
