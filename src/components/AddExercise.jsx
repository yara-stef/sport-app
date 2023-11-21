import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useExercises } from '../hooks/useExercises';

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

function AddExercise() {    
    const { addExercise } = useExercises();

    
  return (
    <>
        <div className='pb-2 pl-1 text-3xl'>Add an exercise</div>
        <Formik
            initialValues={{
              exerciseName: '',
              description: '',
              muscleGroup: '',
              equipmentNeeded: '',
              difficulty: '',
            }}
            validationSchema={Yup.object({
                exerciseName: Yup.string()
                .max(500, '')
                .required('Required'),
                description: Yup.string()
                .max(500, '')
                .required('Required'),
                muscleGroup: Yup.string()
                .max(500, '')
                .required('Required'),
                equipmentNeeded: Yup.string()
                .max(500, '')
                .required('Required'),
                difficulty: Yup.string()
                .max(500, '')
                .required('Required'),
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                await  addExercise({
                          name: values.exerciseName, 
                          description: values.description, 
                          muscleGroup: values.muscleGroup, 
                          equipmentNeeded: values.equipmentNeeded, 
                          difficulty: values.difficulty,
                      });
                    console.log(values);
                    setSubmitting(false);
                
            }}
        >
            <Form>
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label="Exercise Name"
                    name="exerciseName"
                    type="text"
                    placeholder='Exercise Name'               
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
                    label='Muscle group'
                    name='muscleGroup'
                    type='text'
                    placeholder='Muscle group'
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Equipment needed'
                    name='equipmentNeeded'
                    type='text'
                    placeholder='Equipment needed'
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Difficulty'
                    name='difficulty'
                    type='text'
                    placeholder='Difficulty'
                ></MyTextInput></div>
                                
                <button  className="mt-2 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
            </Form>           
        </Formik> 
    </>
    
  )
}

export default AddExercise