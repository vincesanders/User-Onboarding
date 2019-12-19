import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default withFormik({
    mapPropsToValues() {
        return {
            name: '',
            email: '',
            password: '',
            tos: false
        }
    },
    handleSubmit(values, { setStatus, resetForm }) {
        console.log('submitting', values);
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('This field is required')
            .min(4, 'Too short!')
            .max(50, 'Too long!'),
        email: Yup.string()
            .email('Invalid e-mail address entered!')
            .required('This field is required'),
        password: Yup.string()
            .required('This field is required')
            .min(8, 'Enter a password that is at least 8 characters long!'),
        tos: Yup.boolean()
            .test('Terms of Service', 'You must accept our terms of service.', value => value === true)
            .required('You must accept our terms of service.')
    })
})(({values, errors, touched, status}) => {
    return (
        <div>
            <Form>
                <label>Name: 
                    <Field type='text' name='name' />
                    {touched.name && errors.name && (<p>{errors.name}</p>)}
                </label>
                <label>Email: 
                    <Field type='text' name='email' />
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                </label>
                <label>Password: 
                    <Field type='text' name='password' />
                    {touched.password && errors.password && (<p>{errors.password}</p>)}
                </label>
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    {errors.tos && (<p>{errors.tos}</p>)}
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
});