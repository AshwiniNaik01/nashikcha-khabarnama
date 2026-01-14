import React from 'react';

interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'rectangular' | 'circular';
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
    const baseClasses = 'animate-pulse bg-gray-200';

    const variantClasses = {
        text: 'h-4 w-full rounded',
        rectangular: 'h-full w-full rounded-sm',
        circular: 'h-10 w-10 rounded-full',
    };

    return (
        <div
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            aria-hidden="true"
        />
    );
};

export default Skeleton;
