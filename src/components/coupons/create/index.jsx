import {
    BooleanInput,
    DateInput,
    Edit,
    NumberInput,
    SimpleForm,
    TextInput,
    Create,
} from "react-admin";

import { CheckValidateCode } from "../../../utils/checkValidateCode";

const validateCouponCreation = (values) => {
    const errors = {};
    //enventcode
    if (!values.eventCode) {
        errors.eventCode = "The Event code is required.";
    }
    if (!CheckValidateCode(values.eventCode)) {
        errors.eventCode = "The Event code must contain numbers and letters.";
    }

    //percent
    if (!values.percent) {
        errors.percent = "The Percent is required.";
    }
    if (values.percent <= 0 || values.percent > 100) {
        errors.percent =
            "The Percent must less than or equal to 100 and greater than 0.";
    }

    //validfrom
    if (!values.validFrom) {
        errors.validFrom = "The Valid From is required.";
    }
    if (values.validFrom) {
        const fromDate = new Date(values.validFrom);
        const toDayDate = new Date(Date.now());

        if (fromDate <= toDayDate)
            errors.validFrom = "The Valid From must greater than today.";
    }

    //validTo
    if (!values.validTo) {
        errors.validTo = "The Valid To is required.";
    }
    if (values.validTo) {
        const fromDate = new Date(values.validFrom);
        const toDate = new Date(values.validTo);

        if (fromDate >= toDate)
            errors.validTo = "The Valid To must greater than Valid From.";
    }

    //number
    if (!values.number) {
        errors.number = "The Number is required.";
    }
    if (values.number <= 0) {
        errors.number = "The Percent must greater than 0.";
    }

    return errors;
};

export const CouponCreate = (props) => (
    <Create {...props}>
        <SimpleForm validate={validateCouponCreation}>
            <TextInput source="eventCode" />
            <NumberInput source="percent" />
            <DateInput source="validFrom" />
            <DateInput source="validTo" />
            <NumberInput source="number" />
        </SimpleForm>
    </Create>
);
