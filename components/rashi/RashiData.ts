export interface Rashi {
    id: string;
    name: string;
    date: string;
    icon: string;
    color: string;
    forecast: string;
}

export const rashiData: Rashi[] = [
    {
        id: "mesh",
        name: "मेष",
        date: "21 Mar - 19 Apr",
        icon: "♈",
        color: "from-red-500 to-orange-500",
        forecast: "आजचा दिवस तुमच्यासाठी ऊर्जा आणि उत्साहाचा असेल. नवीन संधी मिळतील.",
    },
    {
        id: "vrushabh",
        name: "वृषभ",
        date: "20 Apr - 20 May",
        icon: "♉",
        color: "from-green-500 to-emerald-500",
        forecast: "आर्थिक बाबींमध्ये सावधगिरी बाळगा. कुटुंबासोबत वेळ घालवाल.",
    },
    {
        id: "mithun",
        name: "मिथुन",
        date: "21 May - 20 Jun",
        icon: "♊",
        color: "from-yellow-400 to-amber-500",
        forecast: "संवाद कौशल्याचा फायदा होईल. कामाच्या ठिकाणी कौतुक होईल.",
    },
    {
        id: "kark",
        name: "कर्क",
        date: "21 Jun - 22 Jul",
        icon: "♋",
        color: "from-blue-400 to-cyan-500",
        forecast: "भावनांवर नियंत्रण ठेवा. आरोग्याची काळजी घ्या.",
    },
    {
        id: "simha",
        name: "सिंह",
        date: "23 Jul - 22 Aug",
        icon: "♌",
        color: "from-orange-500 to-red-600",
        forecast: "आत्मविश्वास वाढेल. नेतृत्वाची संधी मिळेल.",
    },
    {
        id: "kanya",
        name: "कन्या",
        date: "23 Aug - 22 Sep",
        icon: "♍",
        color: "from-emerald-500 to-teal-600",
        forecast: "कामात अचूकता ठेवा. मित्रांची मदत मिळेल.",
    },
    {
        id: "tula",
        name: "तूळ",
        date: "23 Sep - 22 Oct",
        icon: "♎",
        color: "from-pink-500 to-rose-500",
        forecast: "संतुलन राखणे महत्त्वाचे आहे. जोडीदाराशी मतभेद टाळा.",
    },
    {
        id: "vrushchik",
        name: "वृश्चिक",
        date: "23 Oct - 21 Nov",
        icon: "♏",
        color: "from-purple-600 to-indigo-600",
        forecast: "गुड रहस्य उलगडतील. अध्यात्माकडे कल वाढेल.",
    },
    {
        id: "dhanu",
        name: "धनु",
        date: "22 Nov - 21 Dec",
        icon: "♐",
        color: "from-violet-500 to-purple-600",
        forecast: "प्रवासाचे योग आहेत. नवीन गोष्टी शिकायला मिळतील.",
    },
    {
        id: "makar",
        name: "मकर",
        date: "22 Dec - 19 Jan",
        icon: "♑",
        color: "from-slate-600 to-gray-700",
        forecast: "कष्टाचे फळ मिळेल. संयम ठेवा.",
    },
    {
        id: "kumbha",
        name: "कुंभ",
        date: "20 Jan - 18 Feb",
        icon: "♒",
        color: "from-cyan-500 to-blue-600",
        forecast: "नाविन्यपूर्ण विचार कराल. सामाजिक कार्यात सहभाग वाढेल.",
    },
    {
        id: "meen",
        name: "मीन",
        date: "19 Feb - 20 Mar",
        icon: "♓",
        color: "from-teal-400 to-cyan-500",
        forecast: "कल्पनाशक्तीला वाव मिळेल. खर्चावर नियंत्रण ठेवा.",
    },
];
