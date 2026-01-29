"use client";

import React, { useEffect, useState } from "react";
import RashiCard from "./RashiCard";
import { getAllRashi, ApiRashi } from "@/components/services/rashiService";
import { Search, Sparkles } from "lucide-react"; // आयकॉन्ससाठी

const RashiGrid = () => {
  const [rashiList, setRashiList] = useState<ApiRashi[]>([]);
  const [filteredList, setFilteredList] = useState<ApiRashi[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRashiData = async () => {
      try {
        const response = await getAllRashi();
        if (response.success) {
          setRashiList(response.data);
          setFilteredList(response.data);
        }
      } catch (error) {
        console.error("राशी डेटा लोड करताना त्रुटी आली:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRashiData();
  }, []);

  // सर्च फिल्टर: मराठी आणि इंग्रजी दोन्हीसाठी
  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = rashiList.filter((item) =>
      item.rashi.toLowerCase().includes(term)
    );
    setFilteredList(filtered);
  }, [searchTerm, rashiList]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-solid border-gray-200"></div>
        <p className="text-gray-500 font-medium">माहिती लोड होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">


      {/* 🔮 Grid Layout */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
          {filteredList.map((rashi) => (
            <RashiCard key={rashi._id} rashi={rashi} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-xl font-bold text-gray-400">क्षमस्व! "{searchTerm}" नावाची रास सापडली नाही.</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 text-red-600 font-bold hover:underline"
          >
            सर्व राशी पुन्हा पहा
          </button>
        </div>
      )}
    </div>
  );
};

export default RashiGrid;