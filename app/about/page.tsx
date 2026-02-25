import { Metadata } from "next";

export const metadata: Metadata = {
  title: "आमच्याबद्दल | नाशिकचा खबरनामा",
  description: "नाशिकचा खबरनामा - नाशिक शहर आणि जिल्ह्यातील ताज्या घडामोडी विश्वसनीयपणे तुमच्यापर्यंत पोहोचवणारे न्यूज पोर्टल.",
};

export default function AboutPage() {
  return (
    <div className="bg-white p-6 rounded shadow font-marathi">
      <h1 className="text-3xl font-heading font-bold mb-4">नाशिकचा खबरनामा बद्दल</h1>
      <p className="text-gray-700 leading-relaxed">
        नाशिकचा खबरनामा हे नाशिक जिल्ह्यातील ताज्या बातम्या, शेती, राजकारण, क्राईम आणि सांस्कृतिक घडामोडींचे विश्वसनीय माध्यम आहे. आमचा उद्देश वाचकांपर्यंत अचूक आणि वेगवान माहिती पोहोचवणे हा आहे.
      </p>
    </div>
  );
}
