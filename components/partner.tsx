import React from 'react'

const Partner = () => {
    return (
        <div className={'px-4'}>
            <h1 className={'text-center py-4 font-pangaia text-3xl font-bold text-gray-600'}>Partnerships</h1>
            <div className="container mx-auto border-t border-gray-200 grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-center ">
                <div className="py-16 border-r border-gray-200">
                    <div className="flex justify-center">
                        <img src={'https://rambleafricasafaris.com/wp-content/uploads/2024/07/SafariBookingLogo-300x232-2.png'} alt={'logo'} className={'w-35'}/>
                    </div>
                </div>

                <div className="py-16 border-r border-gray-200">
                    <div className="flex justify-center">
                        <img src={'https://trims.tourismauthority.go.ke/img/logo/logo.png'} alt={'logo'} className={'w-40'}/>
                    </div>
                </div>

                <div className="py-16 ">
                    <div className="flex justify-center">
                        <img src={'https://images.seeklogo.com/logo-png/36/1/tripadvisor-logo-png_seeklogo-368343.png'} alt={'logo'} className={'w-20'}/>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Partner
