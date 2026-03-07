"use client";

import React, { Suspense } from "react";
import WeeklyHoroscope from "@/components/home/WeeklyHoroscope";

const WeeklyRashiContent = () => {
    return (
        <div className="bg-white min-h-screen">

            <div className="py-8 px-4 md:px-8 lg:px-16 container mx-auto max-w-7xl">
                <WeeklyHoroscope />
            </div>
        </div>
    );
};

export default function WeeklyRashiClient() {
    return (

        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center py-20 font-marathi">
                <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="font-bold italic text-gray-400">माहिती लोड होत आहे...</div>
            </div>
        }>
            <WeeklyRashiContent />
        </Suspense>
    );
}