import { FilePlusIcon, InboxIcon } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-[2.5rem] my-8">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="relative bg-slate-800 p-6 rounded-3xl border border-slate-700 text-slate-500 shadow-2xl">
          <InboxIcon size={48} strokeWidth={1.5} />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl text-white shadow-lg border-2 border-slate-900">
          <FilePlusIcon size={16} />
        </div>
      </div>

      <div className="text-center max-w-xs">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
          No hay facturas aún
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Comienza creando tu primera factura para verla listada en este panel de control.
        </p>
      </div>

      <Link 
        href="/facturas"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95"
      >
        <FilePlusIcon size={18} />
        Crear mi primera factura
      </Link>
    </div>
  );
}