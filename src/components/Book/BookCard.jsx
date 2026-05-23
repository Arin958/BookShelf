import { useDispatch } from "react-redux";
import { deleteBook, toggleBookStatus } from "../../store/slices/bookSlice";

const statusColors = {
  want: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  reading: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  finished: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
};

const statusEmojis = {
  want: "",
  reading: "",
  finished: "",
};

export const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {book.title}
          </h3>
          <button
            onClick={() => dispatch(deleteBook(book.id))}
            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition"
          >
            🗑️
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          by {book.author}
        </p>

        <div className="flex justify-between items-center">
          <button
            onClick={() => dispatch(toggleBookStatus(book.id))}
            className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[book.status]} transition hover:opacity-80`}
          >
            {statusEmojis[book.status]} {book.status.toUpperCase()}
          </button>

          <span className="text-xs text-gray-500 dark:text-gray-500">
            Added: {new Date(book.addedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};
