import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  label: string;
  icon: LucideIcon;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  onClick?: () => void;
}

export default function ActionButton({ label, icon: Icon, variant = "primary", onClick }: ActionButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-slate-950/50",
    danger: "bg-rose-600/10 hover:bg-rose-600 text-rose-500 hover:text-white border-rose-500/20 shadow-rose-900/10",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white border-transparent"
  };

  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold border transition-all active:scale-95 shadow-lg ${variants[variant]}`}
    >
      <Icon size={18} />
      <span className="text-sm tracking-tight">{label}</span>
    </button>
  );
}