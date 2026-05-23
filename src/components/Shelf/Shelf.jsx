import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";

export default function Shelf() {
    const {user, logout} = useAuth();
    const {theme, toggleTheme} = useTheme();

     return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            📚 My Bookshelf
          </h1>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              Welcome, {user?.name}
            </span>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {theme === 'light' ? 'Moon' : 'Sun'}
            </button>
            
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Your books will appear here soon! 📖
          </p>
        </div>
      </div>
    </div>
  );
}