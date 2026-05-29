import React from 'react'
import Navbar from "@/components/Navbar";
import { NavbarProvider } from "@/hooks/use-navbar";

const RootLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <NavbarProvider>
            <main className={'font-grotesque'}>
                <Navbar />
                {children}
            </main>
        </NavbarProvider>
    )
}
export default RootLayout
