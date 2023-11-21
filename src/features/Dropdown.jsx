import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

const MySelect = ({ label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className='mb-2 col-start-2'>
            <label htmlFor={props.id}>{label}</label>
            <select {...field} {...props}></select>
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ) : null}
        </div>
    );
};



function Dropdown({items, handleSubmit}) {

  return (
    <>
        <Formik
        initialValues={{
            items: '',
        }}
        validationSchema={Yup.object({
            itms: Yup.string()
            .oneOf(items, 
                'Invalid'
            ),
            // .required('Required'),        
        })}
        onSubmit={ async (values, { setSubmitting }) => {
             // debugger
             await handleSubmit(values);
             // console.log(values); 
             setSubmitting(false);  
            
        }}
        >
            <Form className=''>
                <MySelect className=' text-black border-solid border-2 rounded shadow-2xl shadow-cyan-500/40 hover:shadow-indigo-500/40 w-48'
                // label='Select'
                name='items'
                >
                    <option value=''>Select </option>
                    {items.map((item) => {
                        return (
                            <option value={item.link} key={item.id}>{item.name}</option>
                        )
                        
                    })}
                    
                </MySelect>
                                
                <button  className="col-start-1 w-64 h-10 bg-zinc-800 rounded shadow-2xl shadow-cyan-500/80 hover:shadow-indigo-500/80" type='submit'>Submit</button>
            </Form>
    </Formik>
    
    </>
  )
}

export default Dropdown