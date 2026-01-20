import React from "react";
import {
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
  TbZodiacAquarius,
  TbZodiacPisces,
} from "react-icons/tb";

export interface Rashi {
  id: string;
  name: string;
  sanskritName: string;
  letters: string;
  date: string;
  icon: React.ReactNode;
  color: string;
  forecast: string;
  element: string;
  rulingPlanet: string;
  luckyNumber: string;
  luckyColor: string;
  compatibility: number;
  image: string;
}

export const rashiData: Rashi[] = [
  {
    id: "mesh",
    name: "मेष",
    sanskritName: "मेष राशि",
    letters: "अ, ल, इ",
    date: "21 मार्च - 19 एप्रिल",
    icon: <TbZodiacAries />,
    color: "from-red-500 to-orange-500",
    forecast:
      "आजचा दिवस तुमच्यासाठी ऊर्जा आणि उत्साहाचा असेल. नवीन संधी मिळतील.",
    element: "अग्नि",
    rulingPlanet: "मंगळ",
    luckyNumber: "9",
    luckyColor: "लाल",
    compatibility: 85,
    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-aries-background-galaxy-generative-ai_1002690-1373.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "vrushabh",
    name: "वृषभ",
    sanskritName: "वृषभ राशि",
    letters: "ब, व, उ",
    date: "20 एप्रिल - 20 मे",
    icon: <TbZodiacTaurus />,
    color: "from-green-500 to-emerald-500",
    forecast: "आर्थिक बाबींमध्ये सावधगिरी बाळगा. कुटुंबासोबत वेळ घालवाल.",
    element: "पृथ्वी",
    rulingPlanet: "शुक्र",
    luckyNumber: "6",
    luckyColor: "हिरवा",
    compatibility: 78,
    image:
      "https://img.freepik.com/premium-photo/zodiak-taurus_1066273-69.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "mithun",
    name: "मिथुन",
    sanskritName: "मिथुन राशि",
    letters: "क, छ, घ",
    date: "21 मे - 20 जून",
    icon: <TbZodiacGemini />,
    color: "from-yellow-400 to-amber-500",
    forecast: "संवाद कौशल्याचा फायदा होईल. कामाच्या ठिकाणी कौतुक होईल.",
    element: "वायु",
    rulingPlanet: "बुध",
    luckyNumber: "5",
    luckyColor: "पिवळा",
    compatibility: 92,
    image:
      "https://img.freepik.com/free-photo/illustrated-rendering-twin-avatar_23-2151061322.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "kark",
    name: "कर्क",
    sanskritName: "कर्क राशि",
    letters: "ड, ह",
    date: "21 जून - 22 जुलै",
    icon: <TbZodiacCancer />,
    color: "from-blue-400 to-cyan-500",
    forecast: "भावनांवर नियंत्रण ठेवा. आरोग्याची काळजी घ्या.",
    element: "जल",
    rulingPlanet: "चंद्र",
    luckyNumber: "2",
    luckyColor: "चांदी",
    compatibility: 76,
    image:
      "https://img.freepik.com/free-photo/fantastic-animal-constellation_23-2151708250.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "simha",
    name: "सिंह",
    sanskritName: "सिंह राशि",
    letters: "म, ट",
    date: "23 जुलै - 22 ऑगस्ट",
    icon: <TbZodiacLeo />,
    color: "from-orange-500 to-red-600",
    forecast: "आत्मविश्वास वाढेल. नेतृत्वाची संधी मिळेल.",
    element: "अग्नि",
    rulingPlanet: "सूर्य",
    luckyNumber: "1",
    luckyColor: "सोनेरी",
    compatibility: 88,
    image:
      "https://img.freepik.com/free-photo/cool-looking-3d-gold-lion-head-with-long-mane_23-2150800677.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "kanya",
    name: "कन्या",
    sanskritName: "कन्या राशि",
    letters: "प, ठ, ण",
    date: "23 ऑगस्ट - 22 सप्टेंबर",
    icon: <TbZodiacVirgo />,
    color: "from-emerald-500 to-teal-600",
    forecast: "कामात अचूकता ठेवा. मित्रांची मदत मिळेल.",
    element: "पृथ्वी",
    rulingPlanet: "बुध",
    luckyNumber: "5",
    luckyColor: "हिरवा",
    compatibility: 82,
    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-virgo_328946-9515.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "tula",
    name: "तूळ",
    sanskritName: "तुला राशि",
    letters: "र, त",
    date: "23 सप्टेंबर - 22 ऑक्टोबर",
    icon: <TbZodiacLibra />,
    color: "from-pink-500 to-rose-500",
    forecast: "संतुलन राखणे महत्त्वाचे आहे. जोडीदाराशी मतभेद टाळा.",
    element: "वायु",
    rulingPlanet: "शुक्र",
    luckyNumber: "6",
    luckyColor: "गुलाबी",
    compatibility: 79,
    image:
      "https://img.freepik.com/free-photo/view-3d-scales-justice-lawyer-s-day_23-2151023430.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "vrushchik",
    name: "वृश्चिक",
    sanskritName: "वृश्चिक राशि",
    letters: "न, य",
    date: "23 ऑक्टोबर - 21 नोव्हेंबर",
    icon: <TbZodiacScorpio />,
    color: "from-purple-600 to-indigo-600",
    forecast: "गुड रहस्य उलगडतील. अध्यात्माकडे कल वाढेल.",
    element: "जल",
    rulingPlanet: "मंगळ",
    luckyNumber: "9",
    luckyColor: "जांभळा",
    compatibility: 84,
    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-scorpio-drawing-scorpion_328946-13381.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {
    id: "dhanu",
    name: "धनु",
    sanskritName: "धनु राशि",
    letters: "भ, ध, फ, ढ",
    date: "22 नोव्हेंबर - 21 डिसेंबर",
    icon: <TbZodiacSagittarius />,
    color: "from-violet-500 to-purple-600",
    forecast: "प्रवासाचे योग आहेत. नवीन गोष्टी शिकायला मिळतील.",
    element: "अग्नि",
    rulingPlanet: "गुरू",
    luckyNumber: "3",
    luckyColor: "जांभळा",
    compatibility: 91,
    image:
      "https://img.freepik.com/premium-photo/woman-purple-dress-riding-white-horse_328946-23203.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {
    id: "makar",
    name: "मकर",
    sanskritName: "मकर राशि",
    letters: "ख, ज",
    date: "22 डिसेंबर - 19 जानेवारी",
    icon: <TbZodiacCapricorn />,
    color: "from-slate-600 to-gray-700",
    forecast: "कष्टाचे फळ मिळेल. संयम ठेवा.",
    element: "पृथ्वी",
    rulingPlanet: "शनि",
    luckyNumber: "8",
    luckyColor: "काळा",
    compatibility: 75,
    image:
      "https://img.freepik.com/premium-photo/astrological-zodiac-signs-capricorn-capricorn-horoscope_597582-544.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {
    id: "kumbha",
    name: "कुंभ",
    sanskritName: "कुम्भ राशि",
    letters: "ग, स, श",
    date: "20 जानेवारी - 18 फेब्रुवारी",
    icon: <TbZodiacAquarius />,
    color: "from-cyan-500 to-blue-600",
    forecast: "नाविन्यपूर्ण विचार कराल. सामाजिक कार्यात सहभाग वाढेल.",
    element: "वायु",
    rulingPlanet: "शनि",
    luckyNumber: "4",
    luckyColor: "निळा",
    compatibility: 87,
    image:
      "https://img.freepik.com/premium-vector/zodiac-sign-aquarius-vector-lineart_77119-178.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {
    id: "meen",
    name: "मीन",
    sanskritName: "मीन राशि",
    letters: "द, च, झ, थ",
    date: "19 फेब्रुवारी - 20 मार्च",
    icon: <TbZodiacPisces />,
    color: "from-teal-400 to-cyan-500",
    forecast: "कल्पनाशक्तीला वाव मिळेल. खर्चावर नियंत्रण ठेवा.",
    element: "जल",
    rulingPlanet: "गुरू",
    luckyNumber: "7",
    luckyColor: "समुद्रफेणी",
    compatibility: 83,
    image:
      "https://img.freepik.com/premium-vector/neon-zodiac-sign-pisces_317810-5668.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
];
