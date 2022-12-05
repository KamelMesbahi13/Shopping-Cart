import React, { useEffect, useState } from 'react';
import StoreItems from '../Data/Items.json';
import StoreItem from '../Components/StoreItem';

const Store:React.FC = () => {

    return (
        <>
            <div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-8 p-8'>
                    {
                        StoreItems.map((item) => {
                            return (
                                <div key={item.id} className='mx-auto shadow-xl p-4'>
                                    <StoreItem {...item} />
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Store


