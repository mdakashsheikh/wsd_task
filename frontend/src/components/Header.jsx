
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteJWTToken } from '../utils/utils';
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
    const onLogout = () => {
        deleteJWTToken();

        return window.location = '/sign-in'
    }
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>TexT AnalyzeR</span>
                        <span className='text-slate-700'>TooL</span>
                    </h1>
                </Link>
                
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                    </Link>

                    <Link to='/add-message'>
                        <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Add Message</li>
                    </Link>
                    
                    <button 
                        className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'
                        type='submit'
                        onClick={onLogout}
                    >
                        LogOut
                    </button> 
                </ul>
            </div>
            <Toaster/>
        </header>
    )
}

export default Header