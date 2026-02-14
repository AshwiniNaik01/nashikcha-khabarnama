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

  const elements = ["सर्व", "अग्नि", "जल", "पृथ्वी", "वायू"];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-CA");
  };

  const fetchRashiData = async (date?: Date) => {

    setLoading(true);

    try {

      const formattedDate = date ? formatDate(date) : undefined;

      const response = await getAllRashi(formattedDate);

      if (response.success) {

        const data = response.data.currentRashi || [];

        setRashiList(data);
        setFilteredList(data);
      }

    } catch (error) {

      console.error("Rashi load error:", error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    const d = new Date(currentDate);
    d.setHours(0, 0, 0, 0);
    fetchRashiData(d);

  }, []);

  const handlePrevDay = () => {

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    newDate.setHours(0, 0, 0, 0);

    setCurrentDate(newDate);
    fetchRashiData(newDate);
  };

  const handleNextDay = () => {

    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    newDate.setHours(0, 0, 0, 0);

    if (newDate > today) return;

    setCurrentDate(newDate);
    fetchRashiData(newDate);
  };

  useEffect(() => {

    let filtered = [...rashiList];

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.rashi.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (elementFilter !== "सर्व") {
      filtered = filtered.filter(
        (item: any) => item.tatva === elementFilter
      );
    }

    setFilteredList(filtered);

  }, [searchTerm, elementFilter, rashiList]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500 font-bold">माहिती लोड होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="max-w-7xl mx-auto mb-2">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col xl:flex-row items-center gap-6">

          <div className="flex items-center bg-indigo-950 rounded-[1.5rem] p-1.5 shadow-lg shrink-0">

            <button onClick={handlePrevDay} className="p-3 text-white/50 hover:text-white">
              <FaChevronLeft size={14} />
            </button>

            <div className="px-5 text-center min-w-[150px]">
              <span className="text-white text-xs font-black">
                {currentDate.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>

            <button
              onClick={handleNextDay}
              disabled={currentDate >= today}
              className={`p-3 ${currentDate >= today
                ? "text-white/20 cursor-not-allowed"
                : "text-white/50 hover:text-white"
                }`}
            >
              <FaChevronRight size={14} />
            </button>

          </div>

          <div className="flex-1 relative w-full">
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-900" />
            <input
              type="text"
              placeholder="Search Rashi...."
              className="w-full pl-6 pr-12 py-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {elements.map((el) => (
              <button
                key={el}
                onClick={() => setElementFilter(el)}
                className={`px-6 py-3 rounded-2xl text-[16px] font-black uppercase tracking-widest transition-all ${elementFilter === el
                  ? "bg-indigo-600 text-black"
                  : "bg-slate-50 text-gray-900"
                  }`}
              >
                {el}
              </button>
            ))}
          </div>

        </div>
      </div>

      {filteredList.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredList.map((rashi) => (
            <RashiCard key={rashi._id} rashi={rashi} />
          ))}
        </div>

      ) : (

        <div className="text-center py-20">
          <p className="text-xl font-bold text-gray-400">डेटा उपलब्ध नाही</p>
        </div>

      )}

    </div>
  );
};

export default RashiGrid;
