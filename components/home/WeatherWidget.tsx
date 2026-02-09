// components/home/WeatherWidget.tsx
'use client';

import React, { useState } from 'react';
import { Thermometer, Cloud, Wind, Sunrise, Clock } from 'lucide-react';

const WeatherWidget = () => {
    const [location] = useState('नाशिक');

    const weatherData = {
        current: {
            temp: '१२°C',
            condition: 'थंड आणि धुके',
            feelsLike: '८°C',
            humidity: '८५%',
            wind: '८ किमी/तास'
        },
        forecast: [
            { day: 'आज', high: '१५°', low: '७°', icon: '☁️' },
            { day: 'उद्या', high: '१७°', low: '८°', icon: '⛅' },
            { day: 'मंगळ', high: '१९°', low: '९°', icon: '☀️' },
            { day: 'बुध', high: '२०°', low: '१०°', icon: '☀️' },
        ]
    };

    return (
        <div className="bg-white text-gray-900 rounded-lg shadow-md border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="font-bold text-lg text-gray-900">{location} हवामान</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} className="text-lokmat-red" /> अद्ययावत: सकाळी ७:३०
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-black text-lokmat-red">{weatherData.current.temp}</div>
                    <p className="text-sm font-medium text-gray-600">{weatherData.current.condition}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <Thermometer size={18} className="text-lokmat-red" />
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">अनुभव</p>
                        <p className="font-bold text-sm">{weatherData.current.feelsLike}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <Cloud size={18} className="text-lokmat-red" />
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">आर्द्रता</p>
                        <p className="font-bold text-sm">{weatherData.current.humidity}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <Wind size={18} className="text-lokmat-red" />
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">वारा</p>
                        <p className="font-bold text-sm">{weatherData.current.wind}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md border border-gray-100">
                    <Sunrise size={18} className="text-lokmat-red" />
                    <div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">सूर्योदय</p>
                        <p className="font-bold text-sm">७:०५</p>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-lokmat-red/10">
                <h4 className="font-bold mb-3 text-[10px] uppercase tracking-widest text-lokmat-red">पुढील अंदाज</h4>
                <div className="grid grid-cols-4 gap-2">
                    {weatherData.forecast.map((day, index) => (
                        <div key={index} className="text-center group">
                            <div className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 transition-colors uppercase">{day.day}</div>
                            <div className="text-xl my-1.5 transform group-hover:scale-110 transition-transform">{day.icon}</div>
                            <div className="text-xs font-black text-gray-900">{day.high}</div>
                            <div className="text-[10px] font-bold text-gray-400">{day.low}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherWidget;