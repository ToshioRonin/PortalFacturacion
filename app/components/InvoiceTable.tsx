import { FileTextIcon, MoreHorizontalIcon } from "lucide-react";

interface InvoiceTableProps {
  children: React.ReactNode;
  count: number;
}

export default function InvoiceTable({ children, count }: InvoiceTableProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-500">
            <FileTextIcon size={20} />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Facturas Registradas
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 uppercase tracking-widest">
            {count} Total
          </span>
          <button className="p-2 text-slate-500 hover:text-white transition-colors">
            <MoreHorizontalIcon size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] bg-slate-950/30">
              <th className="px-8 py-5">Folio</th>
              <th className="px-8 py-5">Cliente</th>
              <th className="px-8 py-5">Emisión</th>
              <th className="px-8 py-5">Monto Total</th>
              <th className="px-8 py-5">Estado</th>
              <th className="px-8 py-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
}