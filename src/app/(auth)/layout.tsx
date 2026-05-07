import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/shared/Navbar';


const layout = ({ children}: {children:React.ReactNode}) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            {children}
           
            <Toaster position="top-center" richColors />
        </div>
    );
};

export default layout;
