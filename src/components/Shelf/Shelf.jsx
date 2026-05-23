import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { fetchBooks } from '../../store/slices/bookSlice';
import { BookCard } from '../Book/BookCard';
import { AddBookForm } from '../Book/AddBookForm';
import { BookFilters } from '../Book/BookFilters';

export const ShelfPage = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  
  const { items, status, error, filter } = useSelector((state) => state.books);
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);
  
  const filteredBooks = items.filter(book => {
    if (filter === 'all') return true;
    return book.status === filter;
  });
  
  const getStatusCount = () => {
    return {
      all: items.length,
      want: items.filter(b => b.status === 'want').length,
      reading: items.filter(b => b.status === 'reading').length,
      finished: items.filter(b => b.status === 'finished').length,
    };
  };
  
  const counts = getStatusCount();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                📚 My Digital Bookshelf
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Welcome back, {user?.name}!
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                📊 {counts.all} total | 📖 {counts.reading} reading
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Book Form */}
          <div className="lg:col-span-1">
            <AddBookForm />
          </div>
          
          {/* Right Column - Books List */}
          <div className="lg:col-span-2">
            <BookFilters />
            
            {/* Loading State */}
            {status === 'loading' && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your books...</p>
              </div>
            )}
            
            {/* Error State */}
            {status === 'failed' && (
              <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded-lg mb-4">
                Error: {error}
              </div>
            )}
            
            {/* Empty State */}
            {status === 'succeeded' && filteredBooks.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {filter === 'all' 
                    ? "Your bookshelf is empty. Add your first book above! 📚" 
                    : `No books with status "${filter}". Try adding some or change filters.`}
                </p>
              </div>
            )}
            
            {/* Books Grid */}
            {status === 'succeeded' && filteredBooks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};