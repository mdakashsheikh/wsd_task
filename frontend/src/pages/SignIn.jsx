import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { saveJWTToken } from '../utils/utils';


const SignIn = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            console.log('Ok')
            const res = await axios.post('http://localhost:5000/api/v1/users/login', formData)
            console.log(res)
            const token = res?.data.token;
            saveJWTToken(token);

            if(res?.status === 400) {
                setErrors(res?.message)
            }

            window.location = '/'
        } catch (error) {
            console.log(error)
            setErrors(error);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <input 
                    type='email' 
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    onChange={handleChange}
                />
                <input 
                    type='password' 
                    placeholder='Password'
                    className='border p-3 rounded-lg'
                    id='password'
                    onChange={handleChange}
                />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
                   SignIn
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Dont have an account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>

            {errors && <p className='text-red-500 mt-5'>{errors ? errors.message : ''}</p>}
        </div>
    )
}

export default SignIn