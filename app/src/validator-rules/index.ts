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
    slug: Yup.string()
        .min(4)
        .matches(/^[a-z|0-9|_|\-]+$/, "Slug must be a-z, 0-9, or underscore")
        .required("Slug is required"),
};

export const PostRules = {
    body: Yup.string().required("Post body is required"),
    slug: Yup.string()
        .min(4)
        .matches(/^[a-z|0-9|_|\-]+$/, "Slug must be a-z, 0-9, or underscore")
        .required("Slug is required"),
    summary: Yup.string().required("Post summary is required"),
    title: Yup.string().required("Post title is required"),
};

export const ManageAccountRules = {
    email: Yup.string().email("Email must be a valid email"),
};
