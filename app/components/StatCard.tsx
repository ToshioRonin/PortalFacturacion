import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatCard({ label, value, icon: Icon, trend, trendPositive }: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800 rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
            trendPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
          }`}>
            {trend}
          </span>
        )}
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h3>
      </div>
    </div>
  );
}