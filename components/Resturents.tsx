import { useEffect, useState } from 'react';
import { _getResturents } from '../lib';
import {  ResturentType } from '../types'

const Resturent = ({location} :any) => {
    const [resturents, setResturents] = useState<ResturentType[]>();

    useEffect(() => {
        _getResturents(location, setResturents)
    }, [])

    return (
        <div style={{ height: '100vh', width: '20%' }}>
            {
                resturents?.map((resturent, index) => {
                    return (
                        <div key={index}>
                            <h3>{resturent.title}</h3>
                            <p>{resturent.address}</p>
                            <hr/>
                        </div>
                    )
                })
            }
           
        </div>
    );
}

export default Resturent
