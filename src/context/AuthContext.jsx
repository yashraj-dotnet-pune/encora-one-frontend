import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

// Robust JWT Parser to handle token persistence on reload
const parseJwt = (token) => {
    try {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error("Token parsing failed", e);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // FIX: Persist User on Page Refresh
    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = parseJwt(token);
                // Check if token exists and is not expired
                if (decoded && decoded.exp * 1000 > Date.now()) {
                    // Normalize Role (Handle Microsoft URL style or simple 'role')
                    const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || "Employee";
                    const deptId = decoded.DepartmentId || null;

                    // Set user data immediately
                    setUser({
                        id: decoded.nameid || decoded.sub,
                        email: decoded.email,
                        role: role,
                        fullName: decoded.unique_name || "User",
                        deptId: deptId
                    });
                } else {
                    // Token invalid or expired
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/Auth/login', { email, password });
            const { token, role, fullName, userId, departmentId } = response.data;

            localStorage.setItem('token', token);
            
            setUser({
                id: userId,
                email,
                role,
                fullName,
                deptId: departmentId
            });
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Login failed. Check credentials." 
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);