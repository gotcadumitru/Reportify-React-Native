import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Introduceti un nume valid!')
    .required('Numele este necesar!'),
  surname: Yup.string()
    .min(1, 'Introduceti un nume de familie valid!')
    .required('Numele este necesar!'),
  localitate: Yup.string()
    .min(1, 'Vă rugăm să introduceți un județ valid!')
    .required('Judetul este obligatoriu!'),
  oras: Yup.string()
    .min(1, 'Vă rugăm să introduceți un ultim oraș valid!')
    .required('Orasul este obligatoriu!'),
});
