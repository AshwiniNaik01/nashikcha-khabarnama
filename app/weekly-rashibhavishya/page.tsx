import type { Metadata } from 'next';
import WeeklyRashiClient from './WeeklyRashiClient';

export const metadata: Metadata = {

    title: 'साप्ताहिक राशीभविष्य : या आठवड्याचे राशी भविष्य | नाशिकचा खबरनामा',
    description: 'मेष ते मीन सर्व १२ राशींचे या आठवड्याचे अचूक आणि सविस्तर राशीभविष्य जाणून घ्या. तुमचा हा आठवडा कसा असेल? शुभ दिनांक, करिअर, आरोग्य आणि महिलांसाठी खास टिप्स.',
    keywords: 'साप्ताहिक राशीभविष्य, साप्ताहिक राशिभविष्य, राशी भविष्य, मेष, वृषभ, मिथुन, कर्क, सिंह, कन्या, तूळ, वृश्चिक, धनु, मकर, कुंभ, मीन, horoscope marathi, weekly horoscope marathi, nashikcha khabarnama rashi bhavishya',
    alternates: {
        canonical: 'https://www.nasikchakhabarnama.com/weekly-rashibhavishya',
    },
    openGraph: {
        title: 'साप्ताहिक राशीभविष्य | नाशिकचा खबरनामा',
        description: 'मेष ते मीन सर्व १२ राशींचे या आठवड्याचे अचूक आणि सविस्तर राशीभविष्य जाणून घ्या.',
        url: 'https://www.nasikchakhabarnama.com/weekly-rashibhavishya',
        siteName: 'नाशिकचा खबरनामा',
        images: [
            {
                url: "https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80",
                width: 740,
                height: 740,
                alt: 'साप्ताहिक राशीभविष्य - नाशिकचा खबरनामा',
            },
        ],
        locale: 'mr_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'साप्ताहिक राशीभविष्य | नाशिकचा खबरनामा',
        description: 'मेष ते मीन सर्व १२ राशींचे या आठवड्याचे अचूक आणि सविस्तर राशीभविष्य जाणून घ्या.',
        images: ["https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?ga=GA1.1.1339275905.1751605421&w=740&q=80"],
    },
};

export default function Page() {
    return <WeeklyRashiClient />;
}