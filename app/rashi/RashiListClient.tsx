"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";
import { FaShare } from "react-icons/fa";
import RashiGrid from "@/components/rashi/RashiGrid";

const RashiListContent = () => {
    const searchParams = useSearchParams();
    const selectedDate = searchParams.get("date");
    const [copied, setCopied] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        setIsMounted(true);

        const baseUrl = "https://www.nasikchakhabarnama.com/rashi";
        const finalUrl = selectedDate ? `${baseUrl}?date=${selectedDate}` : baseUrl;
        setShareUrl(finalUrl);
    }, [selectedDate]);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag('event', 'view_rashi_list', {
                selected_date: selectedDate || 'today',
                page_location: window.location.href
            });
        }
    }, [selectedDate]);

    const handleShare = async () => {
        const isShareSupported = typeof navigator !== "undefined" && !!navigator.share;

        if (typeof window !== "undefined" && (window as any).gtag) {
            (window as any).gtag('event', 'click_share_rashi_list', {
                method: isShareSupported ? 'System Share' : 'Copy Link'
            });
        }

        if (isShareSupported) {
            try {

                const shareData: ShareData = {
                    title: "राशीभविष्य | नाशिकचा खबरनामा",
                    text: "आजचे राशीभविष्य जाणून घ्या. मेष ते मीन सर्व १२ राशींचे अचूक भविष्य.",
                    url: shareUrl,
                };


                await navigator.share(shareData);

            } catch (error) {

                console.log("Sharing failed or cancelled:", error);
            }
        } else {

            try {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy link:", err);
            }
        }
    };


    if (!isMounted) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-500 font-medium font-marathi text-lg">राशी भविष्य लोड होत आहे...</p>
            </div>
        );
    }

    return (
        <div className="text-gray-900 relative min-h-[80vh] overflow-hidden rounded-3xl font-marathi">

            <div
                className="fixed inset-0 z-0 opacity-20 filter pointer-events-none"
                style={{
                    backgroundImage: "url('https://img.freepik.com/premium-psd/circle-golden-zodiac-signs-capricorn_684888-663.jpg?w=740')",
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundAttachment: 'fixed',
                }}
            />

            <div className="py-2 md:py-2 relative z-10">
                <div className="text-center mb-10 md:mb-16 relative">
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        भाग्य आणि भविष्य
                    </div>

                    <h1 className="text-5xl md:text-5xl font-black mb-6 tracking-tighter leading-none">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500">
                            राशी
                        </span>
                        <span className="text-red-600"> भविष्य</span>
                    </h1>

                    <div className="text-lg md:text-xl text-gray-700 max-w-xl mx-auto font-serif italic mb-8">
                        {selectedDate ? `तारीख: ${selectedDate} चे राशीभविष्य` : "तुमचे आजचे, उद्याचे आणि या आठवड्याचे भविष्य जाणून घ्या."}
                        <span className="block mt-2 text-red-900 font-black not-italic">
                            तुमचा दिवस शुभ राहो!
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-3 mb-12">
                        <button
                            onClick={handleShare}
                            className="px-6 py-3 bg-yellow-600 text-white flex items-center justify-center gap-2 rounded-xl hover:opacity-90 transition-all shadow-sm border border-yellow-700 font-bold"
                        >
                            {copied ? <Check size={20} /> : <FaShare size={20} />}
                            <span> {copied ? "लिंक कॉपी झाली!" : "शेअर करा"}</span>
                        </button>
                    </div>
                </div>

                {/* Zodiac Grid */}
                <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <RashiGrid date={selectedDate} />
                </div>

                <div className="mt-20 text-center opacity-50">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest max-w-md mx-auto">
                        टीप: वरील राशीभविष्य हे सामान्य ग्रहमानावर आधारित आहे. अचूक मार्गदर्शनासाठी तज्ज्ञांचा सल्ला घ्या.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function RashiListClient() {
    return (
        <Suspense fallback={<div className="text-center py-20 font-marathi">लोड होत आहे...</div>}>
            <RashiListContent />
        </Suspense>
    );
}