import React from "react";

interface RashiBhavishyaCardProps {
    rashi: string;
    dateRange: string;
    prediction: string;
    color?: string;
}

const RashiBhavishyaCard: React.FC<RashiBhavishyaCardProps> = ({
    rashi,
    dateRange,
    prediction,
    color = "bg-primary",
}) => {
    return (
        <div
            className={`p-6 rounded-xl shadow-lg transform transition hover:scale-105 ${color} text-white`}
        >
            <h2 className="text-2xl font-bold mb-2">{rashi}</h2>
            <p className="italic mb-4">{dateRange}</p>
            <p>{prediction}</p>
        </div>
    );
};

export default RashiBhavishyaCard;
