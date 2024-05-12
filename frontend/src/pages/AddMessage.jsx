import axios from 'axios';
import React, { useState } from 'react'
import { getJWTToken } from '../utils/utils';

const AddMessage = () => {
    const [message, setMessage] = useState('');

    const token = getJWTToken();

    // Set headers
    const headers = {
        Authorization: `Bearer ${token}`
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/api/v1/message/post-sentence', { 
                message 
            }, {
                headers
            })


            window.location = '/'

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>ADD MESSAGE</h1>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                <textarea
                    type='text' 
                    placeholder='Write your message'
                    className='border p-3 rounded-lg'
                    onChange={(e) => setMessage(e.target.value)}
                />
            
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85'>
                   submit
                </button>
            </form>

        </div>
    )
}

export default AddMessage