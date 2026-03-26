"use client";

import { useState, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import { clientes } from "../../data/clientes";
import { productos } from "../../data/productos";

export default function NuevaFacturaPage() {
  const router = useRouter();
  const [clienteId, setClienteId] = useState<number>(0);
  const [items, setItems] = useState([{ productoId: 0, cantidad: 1, precio: 0 }]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const nuevoSubtotal = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const nuevoIva = nuevoSubtotal * 0.16;
    setSubtotal(nuevoSubtotal);
    setIva(nuevoIva);
    setTotal(nuevoSubtotal + nuevoIva);
  }, [items]);

  const agregarItem = () => {
    setItems([...items, { productoId: 0, cantidad: 1, precio: 0 }]);
  };

  const eliminarItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const actualizarItem = (index: number, campo: string, valor: number) => {
    const nuevosItems = [...items];
    if (campo === "productoId") {
      const prod = productos.find(p => p.id === valor);
      nuevosItems[index] = { 
        ...nuevosItems[index], 
        productoId: valor, 
        precio: prod?.precio || 0 
      };
    } else {
      nuevosItems[index] = { ...nuevosItems[index], [campo]: valor };
    }
    setItems(nuevosItems);
  };

  const guardarFactura = async () => {
    if (clienteId === 0 || items.some(i => i.productoId === 0)) {
      alert("Por favor selecciona un cliente y productos válidos");
      return;
    }

    try {
      const res = await fetch("/api/facturas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          clienteId, 
          productos: items,
          subtotal,
          iva,
          total
        }),
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
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

          <button 
            onClick={guardarFactura}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <SaveIcon size={18} />
            Guardar Factura
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                  <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">
                    Seleccionar Cliente
                  </label>
                  <select 
                    value={clienteId}
                    onChange={(e) => setClienteId(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer appearance-none"
                  >
                    <option value={0}>Selecciona un cliente...</option>
                    {clientes.map(c => (
                      <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <ReceiptIcon size={120} />
               </div>
               <p className="text-blue-100 text-[10px] font-black uppercase tracking-[0.2em]">Total Factura</p>
               <h2 className="text-5xl font-black mt-2 tracking-tighter">
                 ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
               </h2>
               <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-sm">
                 <div className="flex justify-between text-blue-100">
                   <span>Subtotal</span>
                   <span className="font-mono font-bold">${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                 </div>
                 <div className="flex justify-between text-white font-bold text-lg">
                   <span>IVA (16%)</span>
                   <span className="font-mono">${iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                 </div>
               </div>
            </section>
          </div>

          <div className="lg:col-span-8">
            <section className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
                    <PackageIcon size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-white tracking-tight">Conceptos</h2>
                </div>
                <button 
                  onClick={agregarItem}
                  className="bg-slate-800 hover:bg-slate-700 text-blue-400 text-xs font-bold px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
                >
                  <PlusIcon size={14} />
                  Agregar Item
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/30 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
                      <th className="px-6 py-5">Producto / Servicio</th>
                      <th className="px-6 py-5 w-24">Cant.</th>
                      <th className="px-6 py-5">Precio Unit.</th>
                      <th className="px-6 py-5">Subtotal</th>
                      <th className="px-6 py-5 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {items.map((item, index) => (
                      <tr key={index} className="group hover:bg-slate-800/20 transition-all">
                        <td className="px-6 py-4">
                          <select 
                            value={item.productoId}
                            onChange={(e) => actualizarItem(index, "productoId", Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition appearance-none cursor-pointer"
                          >
                            <option value={0}>Seleccionar...</option>
                            {productos.map(p => (
                              <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input 
                            type="number" 
                            min={1}
                            value={item.cantidad}
                            onChange={(e) => actualizarItem(index, "cantidad", Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white text-center focus:ring-2 focus:ring-blue-500 outline-none" 
                          />
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-sm text-slate-400">
                            ${item.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono font-bold text-white">
                            ${(item.cantidad * item.precio).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button 
                            onClick={() => eliminarItem(index)}
                            className="p-2.5 bg-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20"
                          >
                            <Trash2Icon size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {items.length === 0 && (
                  <div className="py-20 flex flex-col items-center justify-center text-slate-600">
                     <PackageIcon size={48} className="mb-4 opacity-10" />
                     <p className="text-sm font-medium">La lista de productos está vacía</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}