import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address!')
    .required('Email is required!'),
  password: Yup.string()
    .min(2, 'Password must be at least 2 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required!'),
});
