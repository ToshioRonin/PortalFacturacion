"use client";

import { 
  FileTextIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  PlusIcon,
  Loader2Icon
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clientes } from "../data/clientes";

// Importación de tus componentes modulares
import StatCard from "./components/StatCard";
import SearchBar from "./components/SearchBar";
import InvoiceTable from "./components/InvoiceTable";
import InvoiceRow from "./components/InvoiceRow";
import EmptyState from "./components/EmptyState";

export default function HomePage() {
  const [facturasProcesadas, setFacturasProcesadas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar datos desde la API (Prisma)
  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/facturas');
        const data = await response.json();
        
        const procesadas = data.map((f: any) => {
          const cliente = clientes.find((c) => c.id === f.clienteId);
          const productosArray = Array.isArray(f.productos) ? f.productos : [];
          
          const subtotal = productosArray.reduce((acc: number, curr: any) => 
            acc + (Number(curr.precio || 0) * Number(curr.cantidad || 0)), 0);

          return {
            id: f.id,
            cliente: cliente?.nombre || "Cliente Desconocido",
            total: subtotal * 1.16,
            fechaFormateada: new Date(f.fecha).toLocaleDateString('es-MX', {
              day: '2-digit', month: 'short', year: 'numeric'
            }),
          };
        });
        
        setFacturasProcesadas(procesadas);
      } catch (error) {
        console.error("Error al cargar facturas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 2. Lógica de Eliminación (Actualiza DB y UI)
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta factura?")) return;

    try {
      const res = await fetch(`/api/facturas/${id}`, { method: 'DELETE' });

      if (res.ok) {
        // Filtramos el estado local para que desaparezca de la tabla al instante
        setFacturasProcesadas((prev) => prev.filter(f => f.id !== id));
      } else {
        alert("Hubo un problema al eliminar la factura en el servidor.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión al intentar eliminar.");
    }
  };

  const montoTotalGlobal = facturasProcesadas.reduce((acc, curr) => acc + curr.total, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2Icon size={40} className="text-blue-500 animate-spin mb-4" />
        <p className="font-bold tracking-tighter opacity-50">Sincronizando base de datos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-3 rounded-2xl shadow-2xl shadow-blue-900/40">
                <FileTextIcon className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tighter text-white">
                  Portal <span className="text-blue-500">Facturación</span>
                </h1>
                <p className="text-slate-500 text-sm font-medium italic">Gestión de Comprobantes Fiscales</p>
              </div>
            </div>
          </div>
          
          <Link 
            href="/facturas"
            className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-950/50 hover:scale-[1.02] active:scale-98 group"
          >
            <PlusIcon size={20} className="group-hover:rotate-90 transition-transform" />
            Nueva Factura
          </Link>
        </header>

        {/* --- STATS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="Monto Total" 
            value={`$${montoTotalGlobal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`}
            icon={TrendingUpIcon}
            trend="+5.2%"
            trendPositive={true}
          />
          <StatCard 
            label="Facturas Emitidas" 
            value={facturasProcesadas.length.toString()}
            icon={FileTextIcon}
          />
          <StatCard 
            label="Clientes Registrados" 
            value={clientes.length.toString()}
            icon={UsersIcon}
          />
        </div>

        {/* --- SEARCH --- */}
        <SearchBar />

        {/* --- DATA TABLE --- */}
        {facturasProcesadas.length > 0 ? (
          <InvoiceTable count={facturasProcesadas.length}>
            {facturasProcesadas.map((factura) => (
              <InvoiceRow 
                key={factura.id}
                id={factura.id}
                cliente={factura.cliente}
                fecha={factura.fechaFormateada}
                total={factura.total}
                onDelete={handleDelete} // <--- Vinculado correctamente
                status={
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase border border-emerald-500/20 tracking-widest">
                    Vigente
                  </span>
                }
              />
            ))}
          </InvoiceTable>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}