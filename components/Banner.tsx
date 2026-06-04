import React from 'react'
import {IconBrandInstagram, IconBrandWhatsapp, IconPhone} from "@tabler/icons-react";

const Banner = () => {
    return (
        <div className={'hidden lg:block bg-emerald-800 px-6 text-white'}>
            <div className="container mx-auto py-3 flex items-center justify-between">
                <div className={'flex items-center space-x-2'}>
                    <h1 className={'font-bold text-sm'}>
                        <IconPhone className={'inline-block mr-2 size-4'}/>
                        <span>+254 769 322 991</span>
                    </h1>
                    | {"  "}
                    <h1 className={'pl-6 font-bold text-sm'}>
                        <span>info@fruitfulnesstravel.co.ke</span>
                    </h1>

                </div>


                <div className={'flex items-center space-x-2'}>
                    <IconBrandWhatsapp size={17}/>
                    <IconBrandInstagram size={17}/>

                </div>
            </div>
        </div>
    )
}
export default Banner
