import {
  UserIcon,
  DollarSignIcon,
  PencilIcon,
  Trash2Icon,
  EyeIcon,
} from "lucide-react";
import Link from "next/link";

interface InvoiceRowProps {
  id: number;
  cliente: string;
  fecha: string;
  total: number;
  status: React.ReactNode;
  onDelete?: (id: number) => void;
}

export default function InvoiceRow({
  id,
  cliente,
  fecha,
  total,
  status,
  onDelete,
}: InvoiceRowProps) {
  return (
    <tr className="hover:bg-slate-800/40 transition-all group border-l-2 border-transparent hover:border-blue-500">
      <td className="px-8 py-5">
        <span className="font-mono text-sm font-bold text-blue-400 bg-blue-500/5 px-3 py-1.5 rounded-lg border border-blue-500/20">
          #{id}
        </span>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-slate-800 p-2 rounded-xl text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <UserIcon size={16} />
          </div>
          <span className="font-bold text-white tracking-tight">{cliente}</span>
        </div>
      </td>
      <td className="px-8 py-5">
        <span className="text-slate-400 text-sm font-medium">{fecha}</span>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center text-lg font-black text-emerald-400 tracking-tighter">
          <DollarSignIcon size={16} className="mr-0.5 opacity-70" />
          {total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
        </div>
      </td>
      <td className="px-8 py-5">{status}</td>
      <td className="px-8 py-5">
        <div className="flex justify-center items-center gap-2">
          <Link
            href={`/details/${id}`}
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-xl transition-all border border-slate-700"
          >
            <EyeIcon size={18} />
          </Link>

          <Link
            href={`/facturas/${id}`}
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-all border border-slate-700"
          >
            <PencilIcon size={18} />
          </Link>

          <button
            onClick={() => onDelete?.(id)}
            className="p-2.5 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all border border-slate-700"
          >
            <Trash2Icon size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
