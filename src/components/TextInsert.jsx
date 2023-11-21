import React, { useState } from 'react';
import { useAthletes } from '../hooks/useAthletes';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MyTextInput = ({ label, ...props }) => {    
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

function TextInsert({ isVisible, placeholder, handleSubmit, value, handleChange, type, name }) {

    if(!isVisible) return null;
   
   
  return (
    <>
    <Formik
        initialValues={{
            name: ''
        }}
        validationSchema={Yup.object({
            nme: Yup.string()
            .max(500),
            
        })}
        onSubmit={ async (values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
        }}
    >
        <Form>
            <MyTextInput
            className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
            // label="Name"
            name='name'
            type={type}
            // value={value}
            // onChange={handleChange}
            placeholder={placeholder}></MyTextInput>

            <button  className="mt-2 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
        </Form>
    </Formik>
    </>
  )
}

export default TextInsert