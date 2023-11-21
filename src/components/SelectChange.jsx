import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';


const MySelect = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className=''>
            <label htmlFor={props.id}>{label}</label>
            <select {...field} {...props}></select>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    );
};

function SelectChange({isVisible, handleSubmit}) {
    if(!isVisible) return null;
  return (
    <Formik
            initialValues={{                
                gender: ''
            }}
            validationSchema={Yup.object({
                gender: Yup.string()
                .oneOf(
                    ['male', 'female', 'other'],
                    'Invalid Gender Type'
                )
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                handleSubmit(values); 
                
            }}
        >
            <Form className='flex'>
                                
                <MySelect 
                 className='text-black w-[181px] border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40' 
                    name="gender"
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
               </MySelect>
                
                
                <button  className=" w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'
                    >Submit</button>
            </Form>           
        </Formik> 
  )
}

export default SelectChange