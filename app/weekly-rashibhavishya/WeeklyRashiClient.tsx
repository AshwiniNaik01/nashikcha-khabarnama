"use client";

import React, { Suspense } from "react";
import WeeklyHoroscope from "@/components/home/WeeklyHoroscope";

const WeeklyRashiContent = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="py-8 px-4 md:px-16 container mx-auto">
                <WeeklyHoroscope />
            </div>
        </div>
    );
};

export default function WeeklyRashiClient() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-bold italic text-gray-400">माहिती लोड होत आहे...</div>}>
            <WeeklyRashiContent />
        </Suspense>
    );
}
