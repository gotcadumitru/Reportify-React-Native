import * as Yup from 'yup';

export const resetPassSchema = Yup.object().shape({
  email: Yup.string()
    .email('Vă rugăm să introduceți o adresă de email validă!')
    .required('E-mailul este necesar!'),
});
