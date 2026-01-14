// "use client";

// import React from "react";
// import RashiCard from "./RashiCard";
// import { rashiData } from "./RashiData";

// const RashiGrid = () => {
//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 md:p-0">
//             {rashiData.map((rashi) => (
//                 <RashiCard key={rashi.id} rashi={rashi} />
//             ))}
//         </div>
//     );
// };

// export default RashiGrid;


// components/rashi/RashiGrid.tsx
"use client";

import React from "react";
import RashiCard from "./RashiCard";
import { rashiData } from "./RashiData";

const RashiGrid = () => {
    return (
        <div className="space-y-12">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
                {rashiData.map((rashi) => (
                    <RashiCard key={rashi.id} rashi={rashi} />
                ))}
            </div>

            {/* Info Section */}

        </div>
    );
};


export default RashiGrid;