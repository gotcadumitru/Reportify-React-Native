import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Please enter a valid name!')
    .required('Name is required!'),
  surname: Yup.string()
    .min(2, 'Please enter a valid last name!')
    .required('Last name is required!'),
  localitate: Yup.string()
    .min(2, 'Please enter a valid last county!')
    .required('County is required!'),
  oras: Yup.string()
    .min(2, 'Please enter a valid last city!')
    .required('City is required!'),
});
