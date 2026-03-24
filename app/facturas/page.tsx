import { 
  ArrowLeftIcon, 
  PlusIcon, 
  UserIcon, 
  PackageIcon, 
  ReceiptIcon,
  SaveIcon 
} from "lucide-react";
import Link from "next/link";
import ActionButton from "../components/ActionButton";
import ProductInputRow from "../components/ProductInputRow";

export default function NuevaFacturaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-3 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white shadow-xl"
            >
              <ArrowLeftIcon size={20} />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tighter">Nueva Factura</h1>
              <p className="text-sm text-slate-500">Genera un nuevo comprobante en el sistema.</p>
            </div>
          </div>

          <ActionButton 
            label="Guardar Factura" 
            icon={SaveIcon} 
            variant="primary" 
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-500">
                  <UserIcon size={20} />
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">Cliente</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
                    Seleccionar Cliente
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:ring-2 focus:ring-blue-600/50 outline-none transition cursor-pointer appearance-none shadow-inner">
                    <option value="">Buscar cliente...</option>
                    <option value="1">Enrique Comparan (ID: 19460205)</option>
                    <option value="2">Tec de Colima (ID: 2)</option>
                  </select>
                </div>
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50 border-dashed text-center">
                  <p className="text-xs text-slate-600 italic">Los clientes se gestionan en memoria.</p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500 text-white">
                <ReceiptIcon size={120} />
              </div>
              <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-2">Total Factura</p>
              <h2 className="text-5xl font-black tracking-tighter">$0.00</h2>
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-sm font-medium">
                <div className="flex justify-between text-blue-100/80">
                  <span>Subtotal</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <div className="flex justify-between text-white text-lg font-bold">
                  <span>Total final</span>
                  <span className="font-mono">$0.00</span>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-8">
            <section className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-600/10 rounded-xl text-amber-500">
                    <PackageIcon size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Conceptos</h2>
                </div>
                <button className="flex items-center gap-2 text-sm font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                  <PlusIcon size={16} strokeWidth={3} />
                  Añadir Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950/30 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-8 py-5">Producto / Servicio</th>
                      <th className="px-8 py-5 w-32 text-center">Cant.</th>
                      <th className="px-8 py-5 text-right">Unitario</th>
                      <th className="px-8 py-5 text-right">Subtotal</th>
                      <th className="px-8 py-5 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    <ProductInputRow />
                  </tbody>
                </table>
                
                <div className="py-20 flex flex-col items-center justify-center text-slate-700 bg-slate-900/20">
                   <PackageIcon size={48} className="mb-4 opacity-10" />
                   <p className="text-sm font-bold uppercase tracking-widest opacity-30">La lista está vacía</p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}