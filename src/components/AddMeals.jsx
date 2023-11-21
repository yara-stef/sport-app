import React from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useMealPlans } from '../hooks/useMealPlans';
import { useAthlete } from '../hooks/useAthlete';
import { useAthletes } from '../hooks/useAthletes';

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

  const MySelect = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className='my-1 flex justify-between '>
            <label htmlFor={props.id}>{label}</label>
            <select {...field} {...props}></select>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    );
}
 

function AddMeals() {
const { mealPlans, addMeals } = useMealPlans();
// console.log(mealPlans);

    return (
    <>
         <button className='pb-2 pl-1 pr-2 text-3xl cursor-pointer'>Add Meal</button>
        <Formik
            initialValues={{
                mealName: '',
                name: '',
                description: '',
                calories: 0,
                recipe: '',
            }}
            validationSchema={Yup.object({
                melName: Yup.string()
                .oneOf(mealPlans),
                name: Yup.string()
                .max(150),
                // .required('Required'),
                description: Yup.string()
                .max(500),
                // .required('Required'),
                calories: Yup.number()
                .max(5000),
                // .required('Required'),
                recipe: Yup.string()
                .max(500),
                // .required('Required'),
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                await addMeals( values.mealName, { name: values.name, description: values.description, calories: values.calories, recipe: values.recipe });
                    // console.log(values, values.mealName);
                    setSubmitting(false);
                
            }}
        >
            <Form>
            <MySelect className='text-black border-solid border-2 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                label='Select a meal'
                name='mealName'
                >
                    <option value=''>Select a meal</option>
                    {mealPlans.map((mealPlan) => {
                        return (
                            <option value={mealPlan.id} key={mealPlan.id}>{mealPlan.name}</option>
                        )
                        
                    })}                    
                </MySelect>

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
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Recipe'
                    name='recipe'
                    type='text'
                    placeholder='Recipe'
                ></MyTextInput></div>
                
                <button  className="mt-2 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
            </Form>           
        </Formik> 
        </>
  )
}

export default AddMeals