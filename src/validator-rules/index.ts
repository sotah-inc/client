import * as Yup from 'yup';

export const UserRules = {
  email: Yup.string().email('Invalid email address').required('Email is required!'),
  password: Yup.string().required('Password is required!')
};
