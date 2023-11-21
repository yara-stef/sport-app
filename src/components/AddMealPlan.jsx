import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useMealPlans } from '../hooks/useMealPlans';

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



function AddMealPlan() {
    const { mealPlans, addMealPlan } = useMealPlans();

  return (
    <>
         <button className='pb-2 pl-1 pr-2 text-3xl cursor-pointer'>Add Meal Plans</button>
        <Formik
            initialValues={{
                name: '',
                description: '',
                calories: 0,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                .max(500),
                // .required('Required'),
                description: Yup.string()
                .max(500),
                // .required('Required'),
                calories: Yup.number()
                .max(10000),
                // .required('Required'),
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                await addMealPlan({ name: values.name, description: values.description, calories: values.calories })
                    console.log(values);
                    setSubmitting(false);
                    
            }}
        >
            <Form>
            <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Name'
                    name='name'
                    type='text'
                    placeholder='Name'
                ></MyTextInput></div>
            
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Description'
                    name='description'
                    type='text'
                    placeholder='Description'
                ></MyTextInput></div>
                                               
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Calories'
                    name='calories'
                    type='number'
                    placeholder='Calories'
                ></MyTextInput></div>
                                
                <button  className="mt-2 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
            </Form>           
        </Formik> 
        </>
  )
}

export default AddMealPlan