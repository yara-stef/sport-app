import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { useExercises } from '../hooks/useExercises';
import { useAthletes } from '../hooks/useAthletes';
import { useAthlete } from '../hooks/useAthlete';

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
};

function AddWorkout() {
    // debugger
    const { athlete } = useAthlete();
    const { exercises }  = useExercises();
    const { addWorkout } = useAthletes();
            
    console.log(athlete);

  return (
    <>
    <Formik
        initialValues={{
            day: '',
            exercises: '',
            sets: 1,
            reps: 1,
            weight: 1,
        }}
        validationSchema={Yup.object({
            day: Yup.string()
            .oneOf(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'day 5']),
            exrcises: Yup.string()
            .oneOf(exercises,
                'Invalid exercise name'
            ),
            // .required('Required'),
            sets: Yup.number()
            .max(20, '')
            .required('Required'),
            reps: Yup.number()
            .max(100)
            .required('Required'),
            weight: Yup.number()
            .max(150)
            .required('Required'),        
        })}
        onSubmit={ async (values, { setSubmitting }) => {
            // debugger
                console.log(values); 
                 await addWorkout( athlete.id, {exercise: values.exercises, sets: values.sets, reps: values.reps, weight: values.weight, day: values.day });
                //  handleSubmit(values);
                 setSubmitting(false);  
            
        }}
        >
            <Form>
                <MySelect className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                label='Day'
                name='day'
                >
                    <option value=''>Select a day</option>                
                        <option value='Day 1'>Day 1</option>
                        <option value='Day 2'>Day 2</option>
                        <option value='Day 3'>Day 3</option>
                        <option value='Day 4'>Day 4</option>
                        <option value='Day 5'>Day 5</option>                  
                </MySelect>

                <MySelect className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                label='Exercises'
                name='exercises'
                >
                    <option value=''>Select an exercise</option>
                    {exercises.map((exercise) => {
                        return (
                            <option value={exercise.name} key={exercise.id}>{exercise.name}</option>
                        )
                        
                    })}
                    
                </MySelect>
                
                <div className='my-1 flex justify-between '>
                    <MyTextInput
                    className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label="Sets"
                    name="sets"
                    type="number"
                    placeholder="Sets"
                    ></MyTextInput>
                </div>
    
                <div className='my-1 flex justify-between '>
                    <MyTextInput
                    className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label="Reps"
                    name="reps"
                    type="number"
                    placeholder="Reps"
                    ></MyTextInput>
                </div>
    
                <div className='my-1 flex justify-between '>
                    <MyTextInput
                    className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label="Weight"
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    ></MyTextInput>
                </div>
    
                <button  className="mt-2 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
            </Form>
    </Formik>
    </>
    
  );
};

export default AddWorkout