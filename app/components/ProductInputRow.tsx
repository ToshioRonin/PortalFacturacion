import { Trash2Icon } from "lucide-react";

interface ProductInputRowProps {
  item: {
    productoId: number;
    cantidad: number;
    precio: number;
  };
  productos: any[]; 
  index: number;
  onUpdate: (index: number, campo: string, valor: number) => void;
  onRemove: (index: number) => void;
}

export default function ProductInputRow({ 
  item, 
  productos, 
  index, 
  onUpdate, 
  onRemove 
}: ProductInputRowProps) {
  
  const subtotal = item.cantidad * item.precio;

  return (
    <tr className="group hover:bg-slate-800/30 transition-colors">
      <td className="px-6 py-4">
        <select 
          value={item.productoId}
          onChange={(e) => onUpdate(index, "productoId", Number(e.target.value))}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition cursor-pointer appearance-none"
        >
          <option value={0}>Seleccionar producto...</option>
          {productos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} (ID: {p.id})
            </option>
          ))}
        </select>
      </td>
      <td className="px-6 py-4">
        <input 
          type="number" 
          min={1}
          value={item.cantidad}
          onChange={(e) => onUpdate(index, "cantidad", Number(e.target.value))}
          placeholder="0"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none transition" 
        />
      </td>
      <td className="px-6 py-4 text-right">
        <span className="font-mono text-sm text-slate-400">
          ${item.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-white">
        <span className="font-mono">
          ${subtotal.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <button 
          onClick={() => onRemove(index)}
          className="p-2.5 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
        >
          <Trash2Icon size={18} />
        </button>
      </td>
    </tr>
  );
}