import React from 'react';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const styles = {
        'Pending': 'bg-orange-100 text-orange-700 border-orange-200',
        'InProgress': 'bg-blue-100 text-blue-700 border-blue-200',
        'In Progress': 'bg-blue-100 text-blue-700 border-blue-200',
        'Resolved': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    
    const normalizedStatus = status?.replace(' ', '') || 'Pending';
    const displayStyle = styles[status] || styles[normalizedStatus] || styles['Pending'];

    const icon = {
        'Pending': <AlertCircle className="w-3 h-3" />,
        'InProgress': <Loader2 className="w-3 h-3 animate-spin" />,
        'In Progress': <Loader2 className="w-3 h-3 animate-spin" />,
        'Resolved': <CheckCircle className="w-3 h-3" />,
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 w-fit ${displayStyle}`}>
            {icon[status] || icon[normalizedStatus] || icon['Pending']}
            {status}
        </span>
    );
};

export default StatusBadge;