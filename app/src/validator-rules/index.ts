import * as Yup from "yup";

export const UserRules = {
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
};

export const PriceListRules = {
    item: Yup.object()
        .nullable(true)
        .required("Item is required"),
    name: Yup.string().required("Name is required"),
    quantity: Yup.number()
        .integer()
        .required("Quantity is required")
        .moreThan(0, "Quantity must be greater than zero"),
};
