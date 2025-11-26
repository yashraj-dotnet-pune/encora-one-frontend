import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const UpdateStatusModal = ({ isOpen, onClose, complaint, onUpdate }) => {
    const [status, setStatus] = useState('Pending');
    const [remarks, setRemarks] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (complaint) {
            setStatus(complaint.status);
            setRemarks(complaint.managerRemarks || '');
        }
    }, [complaint]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.put('/Complaint/update-status', {
                complaintId: complaint.complaintId,
                status: status === 'In Progress' ? 2 : status === 'Resolved' ? 3 : 1, 
                remarks
            });
            onUpdate(); 
            onClose();
        } catch (error) {
            alert("Failed to update status. Ensure you are authorized.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40" onClick={onClose} />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Update Complaint #{complaint?.complaintId}</h3>
                                    <p className="text-sm text-slate-500">Take action on this grievance</p>
                                </div>
                                <button onClick={onClose}><X className="w-5 h-5 text-slate-400" /></button>
                            </div>
                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
                                    <p className="text-sm text-slate-500 mb-1">Issue Reported:</p>
                                    <p className="font-medium text-slate-800">{complaint?.title}</p>
                                    <p className="text-sm text-slate-600 mt-2">{complaint?.description}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                                    <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2 border rounded-xl" required>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Manager Remarks</label>
                                    <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows="3" className="w-full px-4 py-2 border rounded-xl" placeholder="Add comments regarding the resolution..." />
                                </div>
                                <button disabled={isSubmitting} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? "Updating..." : "Update Status"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default UpdateStatusModal;