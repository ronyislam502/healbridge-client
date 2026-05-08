import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/shared/Navbar';


const layout = ({ children}: {children:React.ReactNode}) => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex-1 overflow-y-auto">
                {children}
            </div>
        </div>
    );
};


export default layout;
