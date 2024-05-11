import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/v1/users/register', formData)
            console.log(res);

            navigate('/sign-in')
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <input 
                    type='text' 
                    placeholder='Name'
                    className='border p-3 rounded-lg'
                    id='name'
                    onChange={handleChange}
                />
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
                   SignUp
                </button>
            </form>
        </div>
    )
}

export default SignUp