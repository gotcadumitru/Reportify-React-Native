import * as Yup from 'yup';

export const resetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address!')
    .required('Email is required!'),
});
