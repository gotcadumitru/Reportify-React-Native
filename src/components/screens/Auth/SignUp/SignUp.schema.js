import * as Yup from 'yup';

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Vă rugăm să introduceți o adresă de email validă!')
    .required('E-mailul este necesar!'),
  password: Yup.string()
    .min(2, 'Parola trebuie să aibă cel puțin 2 caractere')
    .max(50, 'Parola trebuie să aibă cel mult 50 de caractere')
    .required('Parola este necesara!'),
  repPassword: Yup.string()
    .min(2, 'Parola trebuie să aibă cel puțin 2 caractere')
    .max(50, 'Parola trebuie să aibă cel mult 50 de caractere')
    .required('Parola este necesara!')
    .oneOf([Yup.ref('password'), null], 'Parola nu corespunde'),
});
