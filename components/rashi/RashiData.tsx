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

  name: string;

  icon: React.ReactNode;

  image: string;
}

export const rashiData: Rashi[] = [
  {

    name: "मेष",

    icon: <TbZodiacAries />,

    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-aries-background-galaxy-generative-ai_1002690-1373.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "वृषभ",


    icon: <TbZodiacTaurus />,

    image:
      "https://img.freepik.com/premium-photo/zodiak-taurus_1066273-69.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "मिथुन",

    icon: <TbZodiacGemini />,

    image:
      "https://img.freepik.com/free-photo/illustrated-rendering-twin-avatar_23-2151061322.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "कर्क",

    icon: <TbZodiacCancer />,

    image:
      "https://img.freepik.com/free-photo/fantastic-animal-constellation_23-2151708250.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "सिंह",

    icon: <TbZodiacLeo />,

    image:
      "https://img.freepik.com/free-photo/cool-looking-3d-gold-lion-head-with-long-mane_23-2150800677.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "कन्या",

    icon: <TbZodiacVirgo />,

    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-virgo_328946-9515.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "तूळ",

    icon: <TbZodiacLibra />,

    image:
      "https://img.freepik.com/free-photo/view-3d-scales-justice-lawyer-s-day_23-2151023430.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "वृश्चिक",

    icon: <TbZodiacScorpio />,

    image:
      "https://img.freepik.com/premium-photo/zodiac-sign-scorpio-drawing-scorpion_328946-13381.jpg?ga=GA1.1.1339275905.1751605421&semt=ais_hybrid&w=740&q=80",
  },
  {

    name: "धनु",

    icon: <TbZodiacSagittarius />,

    image:
      "https://img.freepik.com/premium-photo/woman-purple-dress-riding-white-horse_328946-23203.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {

    name: "मकर",

    icon: <TbZodiacCapricorn />,

    image:
      "https://img.freepik.com/premium-photo/astrological-zodiac-signs-capricorn-capricorn-horoscope_597582-544.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {

    name: "कुंभ",

    icon: <TbZodiacAquarius />,

    image:
      "https://img.freepik.com/premium-vector/zodiac-sign-aquarius-vector-lineart_77119-178.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
  {

    name: "मीन",

    icon: <TbZodiacPisces />,

    image:
      "https://img.freepik.com/premium-vector/neon-zodiac-sign-pisces_317810-5668.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
  },
];
