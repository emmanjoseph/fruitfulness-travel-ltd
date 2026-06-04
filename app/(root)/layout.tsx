import React from 'react'
import Navbar from "@/components/Navbar";
import { NavbarProvider } from "@/hooks/use-navbar";
import Banner from "@/components/Banner";

const RootLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <NavbarProvider>
            <main className={'font-grotesque'}>
                <Banner/>
                <Navbar />
                {children}
            </main>
        </NavbarProvider>
    )
}
export default RootLayout
