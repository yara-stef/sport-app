import React, { useRef, useState } from 'react';
import { Formik, Form, useField, Field } from 'formik';
import * as Yup from 'yup';
import { useAthletes } from '../hooks/useAthletes';
import { useMealPlans } from '../hooks/useMealPlans';
import { useMaterials } from '../hooks/useMaterials';
import Dropdown from '../features/Dropdown';

const MyTextInput = ({ label, ...props }) => {    
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id }>{label}</label>
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
        <div className='flex justify-between'>
            <label htmlFor={props.id }>{label}</label>
            <select {...field} {...props}></select>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    );
};

function AddAthlete ({handleSubmit}) {    
    const { addAthlete } = useAthletes(); 
    const [date, setDate] = useState('');
    const [athlete, setAthlete] = useState(null);
    const dateInputRef = useRef(null);
    const { mealPlans } = useMealPlans();
    const { materials } = useMaterials();
    const [inactive, setInactive] = useState(false);
    // console.log(mealPlans);
    console.log(materials);
    
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }



    return (
        <>
        <Formik
            initialValues={{
                name: '',
                age: 14,
                weight: 30,
                expirience: 0,
                gender: '',
                healthCondition: '',
                goals: '',
                mealPlans: '',
                materials: '',
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                .max(100, ''),
                // .required('Required'),
                age: Yup.number()
                .max(100),
                // .required('Required'),
                weight: Yup.number()
                .max(150),
                // .required('Required'),
                expirience: Yup.number()
                .max(80),
                // .required('Required'),
                gender: Yup.string()
                .oneOf(
                    ['male', 'female', 'other'],
                    'Invalid Gender Type'
                ),
                // .required('Required'),
                healthCondition: Yup.string()
                .max(1000, 'Must be 1000 characters or less'),
                // .required('Required'),
                goals: Yup.string()
                .max(1000, 'Must be 1000 characters or less'),
                // .required('Required'),
                mealPans: Yup.string()
                .oneOf(mealPlans),
                materals: Yup.string()
                .oneOf(materials),
            })}
            onSubmit={ async (values, { setSubmitting }) => {
                await addAthlete( { name: values.name, age: values.age, weight: values.weight, experience: values.expirience, gender: values.gender, healthCondition: values.healthCondition, goals: [values.goals], birthdate: date, mealPlans: values.mealPlans, materials: [values.materials] });
                handleSubmit();
                console.log(values);
                setSubmitting(false);
                setInactive(true);
                setAthlete(values)
            }}
        >
            <Form>
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40 '
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="Name"
                    disabled={inactive}
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Age'
                    name='age'
                    type='number'
                    placeholder='Age'
                    disabled={inactive}
                ></MyTextInput></div>
                
                <MySelect 
                 className='text-black  border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label="Gender" 
                    name="gender"
                    disabled={inactive}
                    >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
               </MySelect>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Weight'
                    name='weight'
                    type='number'
                    placeholder='Weight'
                    disabled={inactive}
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Expirience'
                    name='expirience'
                    type='number'
                    placeholder='Expirience'
                    disabled={inactive}
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Health condition'
                    name='healthCondition'
                    type='text'
                    placeholder='Health condition'
                    disabled={inactive}
                ></MyTextInput></div>
                
                <div className='my-1 flex justify-between '><MyTextInput
                 className='text-black border-solid border-2  rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'
                    label='Goals'
                    name='goals'
                    type='text'
                    placeholder='Goals'
                    disabled={inactive}
                ></MyTextInput></div>
                
                <div  className='flex justify-between my-1 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40'>Birth Date
                    <input className='text-black rounded' type='date' onChange={handleDateChange} ref={dateInputRef}
                    disabled={inactive}></input>
                </div>

                <MySelect className=' text-black border-solid border-2 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40 w-48'
                label='Select a meal plan'
                name='mealPlans'
                disabled={inactive}
                >
                    <option value=''>Select </option>
                    {mealPlans.map((mealPlan) => {
                        return (
                            <option value={mealPlan.name} key={mealPlan.id}>{mealPlan.name}</option>
                        )
                        
                    })}
                    
                </MySelect>

                <MySelect className=' text-black border-solid border-2 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40 w-48'
                label='Select a material'
                name='materials'
                disabled={inactive}
                >
                    <option value=''>Select </option>
                    {materials.map((material) => {
                        return (
                            <option value={material.link} key={material.id}>{material.name}</option>
                        )
                        
                    })}
                    
                </MySelect>


                <button  className=" w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'
                    disabled={inactive}>Submit</button>
            </Form>           
        </Formik> 

        {/* <div className='grid grid-cols-1 my-1'>
            <div>Select Meal Plan</div>
                    <Dropdown items={mealPlans} handleSubmit={(values) => mealPlans.push(values)} />
        </div>

        <div className='grid grid-cols-1 my-1'>
            <div>Select Materials</div>
                    <Dropdown items={materials} handleSubmit={(values) => materials.push(values)} />
        </div> */}
        </>
               
    );
};





export default AddAthlete