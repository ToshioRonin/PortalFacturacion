import { 
  ArrowLeftIcon, 
  PrinterIcon, 
  DownloadIcon, 
  CalendarIcon, 
  UserIcon, 
  HashIcon,
  CreditCardIcon
} from "lucide-react";
import Link from "next/link";

export default function DetalleFacturaPage() {
  // Datos de ejemplo para la vista previa
  const factura = {
    id: "101",
    fecha: "23 de Marzo, 2026",
    cliente: "Acme Corp",
    clienteId: 1,
    total: 15420.50,
    productos: [
      { id: 1, nombre: "Laptop Gamer MSI", cantidad: 1, precio: 12000 },
      { id: 2, nombre: "Mouse Logitech G502", cantidad: 2, precio: 1710.25 },
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        
        {/* --- NAVEGACIÓN Y ACCIONES --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors w-fit"
          >
            <ArrowLeftIcon size={18} />
            <span>Volver al listado</span>
          </Link>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl border border-slate-700 transition-all">
              <PrinterIcon size={18} />
              Imprimir
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
              <DownloadIcon size={18} />
              Descargar PDF
            </button>
          </div>
        </div>

        {/* --- CUERPO DE LA FACTURA --- */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Header del Documento */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 md:p-12 border-b border-slate-800">
            <div className="flex justify-between items-start">
              <div>
                <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-900/40">
                  <HashIcon className="text-white" size={24} />
                </div>
                <h1 className="text-4xl font-black text-white tracking-tighter">FACTURA</h1>
                <p className="text-blue-400 font-mono mt-1 text-lg">#{factura.id}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                  Pagada
                </div>
                <p className="text-slate-400 text-sm mt-4 flex items-center justify-end gap-2">
                  <CalendarIcon size={14} />
                  {factura.fecha}
                </p>
              </div>
            </div>
          </div>

          {/* Información de Cliente */}
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Emisor</p>
              <h3 className="text-xl font-bold text-white">Tu Empresa S.A. de C.V.</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Av. Tecnológico #125, Colima, México.<br />
                RFC: ABC123456XYZ
              </p>
            </div>
            <div className="space-y-2 md:text-right">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Facturado a</p>
              <h3 className="text-xl font-bold text-white flex items-center md:justify-end gap-2">
                <UserIcon size={20} className="text-blue-500" />
                {factura.cliente}
              </h3>
              <p className="text-slate-400 text-sm italic">ID de Cliente: {factura.clienteId}</p>
            </div>
          </div>

          {/* Tabla de Productos */}
          <div className="px-8 md:px-12 pb-8">
            <div className="rounded-2xl border border-slate-800 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-bold tracking-tighter">
                  <tr>
                    <th className="px-6 py-4">Descripción</th>
                    <th className="px-6 py-4 text-center">Cant.</th>
                    <th className="px-6 py-4 text-right">Precio Unit.</th>
                    <th className="px-6 py-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {factura.productos.map((prod) => (
                    <tr key={prod.id} className="text-sm">
                      <td className="px-6 py-5 font-medium text-white">{prod.nombre}</td>
                      <td className="px-6 py-5 text-center text-slate-400">{prod.cantidad}</td>
                      <td className="px-6 py-5 text-right text-slate-400 font-mono">${prod.precio.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-bold text-white font-mono">${(prod.cantidad * prod.precio).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Resumen Final */}
          <div className="bg-slate-800/30 p-8 md:p-12 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                <div className="bg-blue-600/20 p-3 rounded-xl text-blue-500">
                  <CreditCardIcon size={24} />
                </div>
              </div>
              
              <div className="w-full md:w-64 space-y-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="font-mono">${(factura.total * 0.84).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>IVA (16%):</span>
                  <span className="font-mono">${(factura.total * 0.16).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end pt-3 border-t border-slate-700">
                  <span className="text-lg font-bold text-white">Total:</span>
                  <span className="text-3xl font-black text-emerald-400 font-mono">
                    ${factura.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}