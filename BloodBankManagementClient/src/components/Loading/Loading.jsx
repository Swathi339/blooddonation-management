import React from 'react';
import {PuffLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='flex justify-center mt-32'>
           <PuffLoader color="#ff7a00" size={100}/>
           
        </div>
    );
};

export default Loading;