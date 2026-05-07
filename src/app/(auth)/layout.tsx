import React from 'react';
import { Toaster } from '@/components/ui/sonner';

const layout = ({ children}: {children:React.ReactNode}) => {
    return (
        <div className="min-h-screen">
            {children}
            <Toaster position="top-center" richColors />
        </div>
    );
};

export default layout;