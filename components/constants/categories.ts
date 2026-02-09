export const NEWS_CATEGORIES = [
    { label: "देश-विदेश", value: "desh-videsh", slugs: ["national", "desh-videsh", "দেশ বিদেশ"] },
    { label: "महाराष्ट्र", value: "maharashtra", slugs: ["maharashtra"] },
    { label: "नासिक शहर", value: "nashik-city", slugs: ["nashik-city", "nashik city"] },
    { label: "नासिक ग्रामीण", value: "nashik-rural", slugs: ["nashik-rural", "nashik rural"] },
    { label: "राजकारण", value: "rajkaran", slugs: ["politics", "rajkaran"] },
    { label: "क्रीडा", value: "sports", slugs: ["sports"] },
    { label: "शेती", value: "sheti", slugs: ["agriculture", "sheti"] },
    { label: "अर्थकारण", value: "arthakaran", slugs: ["business", "arthakaran", "अर्थकारण"] },
    { label: "गुन्हेगारी", value: "crime", slugs: ["crime", "punish", "गुन्हेगारी"] },
    { label: "पंचायत राज", value: "panchayat-raj", slugs: ["panchayat-raj", "panchayat raj"] },
    { label: "नासिक", value: "nashik", slugs: ["nashik"] },
    { label: "राशीभविष्य", value: "horoscope", slugs: ["horoscope", "rashi"] },
    { label: "व्हिडीओ", value: "videos", slugs: ["videos", "video", "व्हिडीओ"] },
];

/**
 * Returns the Marathi label for a given category value (English slug) or label (Marathi).
 */
export const getCategoryLabel = (value: string): string => {
    if (!value) return "";
    const searchValue = value.toLowerCase().trim();

    const category = NEWS_CATEGORIES.find(
        (c) =>
            c.value === searchValue ||
            c.label === value ||
            c.slugs.includes(searchValue)
    );

    return category ? category.label : value;
};

/**
 * Returns the primary English value (slug) for a given category label or value.
 */
export const getCategoryValue = (label: string): string => {
    if (!label) return "";
    const searchValue = label.toLowerCase().trim();

    const category = NEWS_CATEGORIES.find(
        (c) =>
            c.label === label ||
            c.value === searchValue ||
            c.slugs.includes(searchValue)
    );

    return category ? category.value : searchValue;
};
