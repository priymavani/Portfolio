export default function LoadingSpinner({ size = 'md' }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`${sizes[size]} border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin`}></div>
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="text-gray-400 mt-4">Loading...</p>
            </div>
        </div>
    );
}
