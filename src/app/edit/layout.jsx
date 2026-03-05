import { AuthProvider } from '@/contexts/AuthContext';

export default function EditLayout({ children }) {
    return <AuthProvider>{children}</AuthProvider>;
}
