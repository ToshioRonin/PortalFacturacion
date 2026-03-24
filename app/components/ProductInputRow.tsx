import { Trash2Icon } from "lucide-react";

export default function ProductInputRow() {
  return (
    <tr className="group hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
        <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer appearance-none">
          <option value="">Seleccionar producto...</option>
          <option value="1">Laptop Gamer (ID: 1)</option>
          <option value="2">Monitor 4K (ID: 2)</option>
        </select>
      </td>
      <td className="px-6 py-4">
        <input 
          type="number" 
          placeholder="0"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
        />
      </td>
      <td className="px-6 py-4 text-right">
        <span className="font-mono text-sm text-slate-400">$0.00</span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-white">
        <span className="font-mono">$0.00</span>
      </td>
      <td className="px-6 py-4 text-center">
        <button className="p-2.5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
          <Trash2Icon size={18} />
        </button>
      </td>
    </tr>
  );
}