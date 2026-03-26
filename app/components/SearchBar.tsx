"use client";

import { SearchIcon, SlidersHorizontalIcon } from "lucide-react";

interface SearchBarProps {
  onSearch?: (term: string) => void; 
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="w-full flex gap-4 items-center mb-8">
      <div className="relative flex-grow group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
          <SearchIcon size={20} />
        </div>
        
        <input 
          type="text" 
          onChange={(e) => onSearch?.(e.target.value)} 
          placeholder="Buscar por cliente, ID o monto..." 
          className="w-full bg-slate-900 text-slate-200 pl-12 pr-4 py-4 rounded-2xl border border-slate-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1">
          <kbd className="px-2 py-1 text-[10px] font-sans font-semibold text-slate-500 bg-slate-800 border border-slate-700 rounded-md">
            CTRL
          </kbd>
          <kbd className="px-2 py-1 text-[10px] font-sans font-semibold text-slate-500 bg-slate-800 border border-slate-700 rounded-md">
            K
          </kbd>
        </div>
      </div>

      <button className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-5 py-4 rounded-2xl hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95">
        <SlidersHorizontalIcon size={20} />
        <span className="hidden sm:inline font-medium">Filtros</span>
      </button>
    </div>
  );
}