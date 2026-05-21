'use client';

import React, { useState } from 'react';
import AgoraUIKit from 'agora-react-uikit';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/shared/Icons';

export default function VideoCall({ videoCallingId, onClose }: { videoCallingId: string, onClose?: () => void }) {
    const [startVideoCall, setStartVideoCall] = useState(false);

    const router = useRouter();

    const rtcProps = {
        appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || 'test',
        channel: videoCallingId, // your agora channel
        token: null, // use null or skip if using app in testing mode
    };

    const callbacks = {
        EndCall: () => {
            setStartVideoCall(false);
            if (onClose) {
                onClose();
            } else {
                router.push('/dashboard');
            }
        },
    };

    return startVideoCall ? (
        <div className="flex w-full h-screen">
            <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center w-full max-w-[500px] mx-auto mt-4 md:mt-24 gap-4 p-4">
            <Button
                onClick={() => setStartVideoCall(true)}
                className="rounded-[20px] flex items-center gap-2 h-10 px-8 bg-teal-600 hover:bg-teal-700 text-white font-bold"
            >
                Start Call
                <Icons.video className="w-4 h-4" />
            </Button>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
                <Image
                    src='https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif'
                    width={500}
                    height={500}
                    alt='video call gif'
                    className="w-full h-auto object-cover"
                    unoptimized
                />
            </div>
        </div>
    );
};