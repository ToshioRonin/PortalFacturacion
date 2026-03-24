import { 
  ArrowLeftIcon, 
  PlusIcon, 
  Trash2Icon, 
  UserIcon, 
  PackageIcon, 
  ReceiptIcon,
  SaveIcon
} from "lucide-react";
import Link from "next/link";

export default function NuevaFacturaPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
            >
              <ArrowLeftIcon size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Generar Factura</h1>
              <p className="text-sm text-slate-500">Completa los datos para emitir el comprobante.</p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-950/20 hover:scale-[1.02]">
            <SaveIcon size={18} />
            Guardar Factura
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- COLUMNA IZQUIERDA: CLIENTE --- */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600/20 rounded-lg text-blue-500">
                  <UserIcon size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">Cliente</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Seleccionar Cliente
                  </label>
                  <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer appearance-none">
                    <option value="">Selecciona un cliente...</option>
                    <option value="1">Acme Corp (ID: 1)</option>
                    <option value="2">Globex (ID: 2)</option>
                  </select>
                </div>
                <p className="text-xs text-slate-500 italic">
                  * Los clientes se cargan desde la memoria del sistema.
                </p>
              </div>
            </section>

            {/* RESUMEN VISUAL */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 shadow-xl text-white">
              <ReceiptIcon size={32} className="mb-4 opacity-50" />
              <p className="text-blue-100 text-sm font-medium uppercase tracking-widest">Total a Pagar</p>
              <h2 className="text-4xl font-black mt-1">$0.00</h2>
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-blue-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-white text-lg">
                  <span>IVA (16%)</span>
                  <span>$0.00</span>
                </div>
              </div>
            </section>
          </div>

          {/* --- COLUMNA DERECHA: PRODUCTOS --- */}
          <div className="lg:col-span-8">
            <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-600/20 rounded-lg text-amber-500">
                    <PackageIcon size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-white">Productos / Servicios</h2>
                </div>
                <button className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                  <PlusIcon size={16} />
                  Agregar Item
                </button>
              </div>

              {/* LISTA DE PRODUCTOS AGREGADOS */}
              <div className="p-0">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Producto</th>
                      <th className="px-6 py-4 w-24">Cant.</th>
                      <th className="px-6 py-4">Precio Unit.</th>
                      <th className="px-6 py-4">Subtotal</th>
                      <th className="px-6 py-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {/* Fila de ejemplo 1 */}
                    <tr className="group hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <select className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none w-full">
                           <option>Seleccionar producto...</option>
                           <option>Laptop Gamer</option>
                           <option>Monitor 4K</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <input type="number" defaultValue={1} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none" />
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-300">
                        $0.00
                      </td>
                      <td className="px-6 py-4 font-bold text-white">
                        $0.00
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                          <Trash2Icon size={18} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                {/* Empty State dentro de la tabla si no hay items */}
                <div className="py-12 flex flex-col items-center justify-center text-slate-600">
                   <PackageIcon size={40} className="mb-2 opacity-20" />
                   <p className="text-sm font-medium">No has añadido productos a la factura.</p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}