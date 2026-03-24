import { PlusIcon, FileTextIcon, UserIcon, DollarSignIcon, Trash2Icon, PencilIcon, SearchIcon } from "lucide-react";

export default function HomePage() {
  // Datos de ejemplo para visualizar el diseño de la tabla
  const facturasEjemplo = [
    { id: 101, cliente: "Acme Corp", total: 15420.50, fecha: "23 Mar 2024" },
    { id: 102, cliente: "Globex Corporation", total: 8900.00, fecha: "22 Mar 2024" },
    { id: 103, cliente: "Soylent Co", total: 21500.99, fecha: "20 Mar 2024" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-950">
                <FileTextIcon className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tighter text-white">
                Portal <span className="text-blue-500">Facturación</span>
              </h1>
            </div>
            <p className="text-slate-400 mt-2 ml-14">Administra tus comprobantes y clientes.</p>
          </div>
          
          <button className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-950/50 hover:scale-[1.02] active:scale-[0.98]">
            <PlusIcon size={20} />
            Crear Nueva Factura
          </button>
        </header>

        {/* --- BARRA DE HERRAMIENTAS (Búsqueda) --- */}
        <div className="mb-8 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex gap-4">
            <div className="relative flex-grow">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                    type="text" 
                    placeholder="Buscar por cliente o ID..." 
                    className="w-full bg-slate-800 text-white pl-12 pr-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
            </div>
        </div>

        {/* --- TABLA DE FACTURAS --- */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Encabezado Visual de la Tabla */}
          <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileTextIcon size={20} className="text-blue-500"/>
                Recientes
            </h2>
            <span className="text-sm font-medium bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                {facturasEjemplo.length} Facturas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-xs text-slate-400 uppercase tracking-wider bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Fecha Emisión</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-800">
                {facturasEjemplo.map((factura) => (
                  <tr key={factura.id} className="hover:bg-slate-800/50 transition-colors group">
                    <td className="px-6 py-5 font-mono text-sm text-blue-400">
                      #{factura.id}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-700 p-2 rounded-full text-slate-400 group-hover:bg-blue-950 group-hover:text-blue-300 transition-colors">
                            <UserIcon size={16} />
                        </div>
                        <span className="font-semibold text-white">{factura.cliente}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-slate-300">
                      {factura.fecha}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center text-lg font-bold text-emerald-400">
                        <DollarSignIcon size={16} className="mr-1" />
                        {factura.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-2.5">
                        <button title="Editar" className="p-2.5 bg-slate-800 text-amber-400 hover:bg-amber-950 rounded-xl transition-colors border border-slate-700 hover:border-amber-800">
                          <PencilIcon size={18} />
                        </button>
                        <button title="Eliminar" className="p-2.5 bg-slate-800 text-red-400 hover:bg-red-950 rounded-xl transition-colors border border-slate-700 hover:border-red-800">
                          <Trash2Icon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer de la Tabla (Opcional) */}
          <div className="px-6 py-4 bg-slate-900/50 border-t border-slate-800 text-center text-sm text-slate-500">
            Mostrando las últimas facturas generadas.
          </div>
        </div>

      </main>
    </div>
  );
}