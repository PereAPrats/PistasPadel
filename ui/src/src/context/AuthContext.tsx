import { createContext, useState, ReactNode, useContext } from 'react';

// Interfície per definir l'estructura de les dades d'autenticació
interface AuthData {
    token: string | null;
    user: string | null;
    role: string | null;
}

// Tipus per al context que conté l'estat i les funcions d'acció
interface AuthContextType {
    auth: AuthData;
    login: (token: string, user: string, role: string) => void;
    logout: () => void;
}

// Creació del Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalitzat per utilitzar el context
export const useAuth = () => {
    const context = useContext(AuthContext);
    
    // Validació crítica: garanteix que el hook només s'usi dins del Provider
    if (context === undefined) {
        throw new Error('useAuth s\'ha d\'utilitzar dins d\'un AuthProvider');
    }
    
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Inicialització de l'estat amb dades de localStorage
    const [auth, setAuth] = useState<AuthData>(() => ({
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
    }));

    // Mètode per iniciar sessió i persistir dades
    const login = (token: string, user: string, role: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('role', role);
        setAuth({ token, user, role });
    };

    // Mètode per tancar sessió i netejar emmagatzematge
    const logout = () => {
        localStorage.clear();
        setAuth({ token: null, user: null, role: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
