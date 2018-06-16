import * as Yup from 'yup';

export const UserRules = {
  email: Yup.string().email('Invalid email address').required('Email is required!'),
  password: Yup.string().required('Password is required!')
};

export const PriceListRules = {
  name: Yup.string().required('Name is required'),
  itemId: Yup.number().integer('ItemId must be an integer').required('ItemId is required'),
  quantity: Yup.number().integer('Quantity must be an integer').required('Quantity is required'),
};
