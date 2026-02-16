"use client";

import React, { useEffect, useState } from "react";
import RashiCard from "./RashiCard";
import { getAllRashi, ApiRashi } from "@/components/services/rashiService";
import { FaChevronLeft, FaChevronRight, FaSearch } from "react-icons/fa";

const RashiGrid = () => {
  const [rashiList, setRashiList] = useState<ApiRashi[]>([]);
  const [filteredList, setFilteredList] = useState<ApiRashi[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [elementFilter, setElementFilter] = useState("सर्व");


  const elements = ["सर्व", "अग्नी", "जल", "पृथ्वी", "वायू"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA");
  };

  const fetchRashiData = async (date: Date) => {
    setLoading(true);
    try {
      const formattedDate = formatDate(date);
      const response = await getAllRashi(formattedDate);
      if (response.success) {
        setRashiList(response.data || []);
      }
    } catch (error) {
      console.error("Rashi load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRashiData(currentDate);
  }, [currentDate]);
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    if (newDate <= today) {
      setCurrentDate(newDate);
    }
  };


  useEffect(() => {
    let filtered = rashiList.filter((item) => {

      const matchesSearch =
        item.rashi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tatva.toLowerCase().includes(searchTerm.toLowerCase());


      const matchesElement =
        elementFilter === "सर्व" || item.tatva === elementFilter;

      return matchesSearch && matchesElement;
    });

    setFilteredList(filtered);
  }, [searchTerm, elementFilter, rashiList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="ml-3 text-gray-500 font-bold">माहिती लोड होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-7xl mx-auto mb-2">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col xl:flex-row items-center gap-6">

          <div className="flex items-center bg-indigo-950 rounded-[1.5rem] p-1.5 shadow-lg shrink-0">
            <button onClick={handlePrevDay} className="p-3 text-white/50 hover:text-white transition-colors">
              <FaChevronLeft size={14} />
            </button>
            <div className="px-5 text-center min-w-[150px]">
              <span className="text-white text-xs font-black uppercase tracking-widest">
                {currentDate.toLocaleDateString("mr-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </span>
            </div>
            <button
              onClick={handleNextDay}
              disabled={currentDate >= today}
              className={`p-3 transition-colors ${currentDate >= today ? "text-white/20 cursor-not-allowed" : "text-white/50 hover:text-white"
                }`}
            >
              <FaChevronRight size={14} />
            </button>
          </div>

          {/* सर्च बार */}
          <div className="flex-1 relative w-full">
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="तुमची राशी शोधा (उदा. मेष, सिंह...)"
              className="w-full pl-6 pr-12 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm text-gray-900 border border-transparent focus:border-indigo-200 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* तत्व फिल्टर्स */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full xl:w-auto no-scrollbar">
            {elements.map((el) => (
              <button
                key={el}
                onClick={() => setElementFilter(el)}
                className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${elementFilter === el
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-50 text-gray-600 hover:bg-slate-100"
                  }`}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ग्रिड डिस्प्ले */}
      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredList.map((rashi) => (
            <RashiCard key={rashi._id} rashi={rashi} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
          <p className="text-xl font-bold text-gray-400">या फिल्टरनुसार कोणतीही राशी सापडली नाही</p>
          <button
            onClick={() => { setSearchTerm(""); setElementFilter("सर्व"); }}
            className="mt-4 text-indigo-600 font-bold underline"
          >
            सर्व राशी पहा
          </button>
        </div>
      )}
    </div>
  );
};

export default RashiGrid;