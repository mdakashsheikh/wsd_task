import React, { useEffect, useState } from 'react'
import { getJWTToken } from '../utils/utils';

const Home = () => {
    const [tokenState, setTokenState] = useState(null);

    useEffect(() => {
        const jwtToken = getJWTToken();

        if(!jwtToken) {
            return window.location = '/sign-in'
        }

        setTokenState(jwtToken);
    }, [])

    // const jwtToken = getJWTToken();
    // console.log(jwtToken)


    return (
        <>
            This is Home Page!
        </>
        

    )
}

export default Home