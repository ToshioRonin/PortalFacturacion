import { PlusIcon, FileTextIcon, UsersIcon, DollarSignIcon } from "lucide-react";
import Link from "next/link";

import SearchBar from "./components/SearchBar";
import StatCard from "./components//StatCard";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceRow from "./components/InvoiceRow";
import EmptyState from "./components/EmptyState";

export default function HomePage() {
  // Simulación de datos (luego vendrán de Prisma)
  const facturas = [
    { id: 101, cliente: "Acme Corp", total: 15420.50, fecha: "23 Mar 2026" },
    { id: 102, cliente: "Globex Corporation", total: 8900.00, fecha: "22 Mar 2026" },
    { id: 103, cliente: "Soylent Co", total: 21500.99, fecha: "20 Mar 2026" },
  ];

  // Cálculo de estadísticas simples
  const totalFacturado = facturas.reduce((acc, curr) => acc + curr.total, 0);

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
          
          <Link 
            href="/facturas"
            className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md shadow-blue-950/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusIcon size={20} />
            Crear Nueva Factura
          </Link>
        </header>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="Total Facturado" 
            value={`$${totalFacturado.toLocaleString()}`} 
            icon={DollarSignIcon}
            trend="+12.5%"
            trendPositive={true}
          />
          <StatCard 
            label="Facturas Emitidas" 
            value={facturas.length.toString()} 
            icon={FileTextIcon}
          />
          <StatCard 
            label="Clientes Activos" 
            value="12" 
            icon={UsersIcon}
            trend="Estable"
            trendPositive={true}
          />
        </div>

        {/* --- SEARCH & FILTERS --- */}
        <SearchBar />

        {/* --- MAIN CONTENT (Table or Empty State) --- */}
        {facturas.length > 0 ? (
          <InvoiceTable count={facturas.length}>
            {facturas.map((f) => (
              <InvoiceRow 
                key={f.id}
                id={f.id}
                cliente={f.cliente}
                fecha={f.fecha}
                total={f.total}
                status={null} // Omitido según tu instrucción
              />
            ))}
          </InvoiceTable>
        ) : (
          <EmptyState />
        )}

        {/* --- FOOTER INFO --- */}
        <footer className="mt-12 py-6 border-t border-slate-900 flex justify-between items-center text-slate-600 text-sm">
          <p>© 2026 Portal de Facturación Monolítico</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              SQLite Online
            </span>
          </div>
        </footer>

      </main>
    </div>
  );
}