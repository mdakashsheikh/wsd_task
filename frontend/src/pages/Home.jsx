import React, { useEffect, useState } from 'react'
import { getJWTToken } from '../utils/utils';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ShowData from './ShowData';

const Home = () => {
    const [tokenState, setTokenState] = useState(null);

    const [allMessage, setAllMessage] = useState(null);

    useEffect(() => {
        const jwtToken = getJWTToken();

        if(!jwtToken) {
            return window.location = '/sign-in'
        }

        setTokenState(jwtToken);

        // Set headers
        const headers = {
            'Authorization': `Bearer ${jwtToken}`
        };

        (async() => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/message/all-message', { headers })
                setAllMessage(res.data.allData)
        
            } catch (err) {
                console.log('Error occured when fetching books');
            }
        }) ()


    }, [])

    

    const buttonAction = (id) => {
        console.log('This is working', id)
        window.location = `/show-data?id=${id}`
    }


    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Message
                            </th>
                           
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allMessage?.map((message, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {message.message}
                                </th>
                                
                                <td className="px-6 py-4">
                                    <Link
                                        to='/show-data'
                                        onClick={() => buttonAction(message._id)}
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </>
        
    )
}

export default Home