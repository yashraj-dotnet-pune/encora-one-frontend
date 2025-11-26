import React from 'react';
import { FileText, LayoutDashboard, Briefcase, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab, complaintCount }) => {
    const { user, logout } = useAuth();
    const isManager = user?.role === 'Manager' || user?.role === 'Admin';

    return (
        <div className="w-72 bg-slate-900 text-white p-6 flex flex-col hidden lg:flex shadow-xl z-20 h-screen sticky top-0">
            <div className="flex items-center gap-3 mb-12">
                <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50">
                    <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="font-bold text-xl tracking-tight">EncoraOne</h1>
                    <p className="text-xs text-slate-400 font-medium">{isManager ? "Manager Portal" : "Employee Portal"}</p>
                </div>
            </div>

            <nav className="flex-1 space-y-2">
                <button 
                    onClick={() => setActiveTab('overview')} 
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'overview' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                    <LayoutDashboard className={`w-5 h-5 ${activeTab === 'overview' ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                    <span className="font-medium">Overview</span>
                </button>
                <button 
                    onClick={() => setActiveTab('complaints')} 
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === 'complaints' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                    <Briefcase className={`w-5 h-5 ${activeTab === 'complaints' ? 'text-white' : 'text-slate-500 group-hover:text-white'}`} />
                    <span className="font-medium">{isManager ? "Dept Grievances" : "My Grievances"}</span>
                    {complaintCount > 0 && <span className="ml-auto bg-slate-800 text-xs py-0.5 px-2 rounded-md">{complaintCount}</span>}
                </button>
            </nav>

            <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center gap-3 mb-4 px-2 p-3 bg-slate-800/50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600 shadow-sm">
                        <User className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate">{user?.fullName}</p>
                        <p className="text-xs text-slate-400 truncate">{user?.role}</p>
                    </div>
                </div>
                <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-red-500/20">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;