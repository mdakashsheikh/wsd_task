import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getJWTToken } from '../utils/utils';

const ShowData = () => {

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const paramValue = urlParams.get('id');

    const [word, setWord] = useState();
    const [character, setCharacter] = useState();
    const [sentence, setSentence] = useState();
    const [paragraph, setParagraph] = useState();
    const [longestWord, setLongestWord] = useState();

    useEffect(() => {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramValue = urlParams.get('id');
       
        const token = getJWTToken();

        // Set headers
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        (async() => {
            try {
                const resWord = await axios.get(`http://localhost:5000/api/v1/message/get-num-word/${paramValue}`, { headers })

                const resCharacter = await axios.get(`http://localhost:5000/api/v1/message/get-num-character/${paramValue}`, { headers })

                const resSentence = await axios.get(`http://localhost:5000/api/v1/message/get-num-sentence/${paramValue}`, { headers })

                const resParagraph = await axios.get(`http://localhost:5000/api/v1/message/get-num-paragraph/${paramValue}`, { headers })

                const resLongestWord = await axios.get(`http://localhost:5000/api/v1/message/get-long-word/${paramValue}`, { headers })
                setWord(resWord?.data)
                setCharacter(resCharacter?.data)
                setSentence(resSentence?.data)
                setParagraph(resParagraph?.data)
                setLongestWord(resLongestWord?.data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
   
    console.log()
    return (
        <div className='flex justify-center py-10 gap-4'>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Need a help in Claim?</h5>
                </a>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">The Number of Words is: {word}</p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">The Number of Characters is: {character}</p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">The Number of Sentences is: {sentence}</p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">The Number of Paragraphs is: {paragraph}</p>
                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">The Longest Words in Paragraphs is: '{longestWord}'</p>
                <a href="/" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                    Go to Home Page
                </a>
            </div>
        </div>
    )
}

export default ShowData