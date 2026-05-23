import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/slices/bookSlice';

const filters = [
  { value: 'all', label: 'All Books', emoji: '' },
  { value: 'want', label: 'Want to Read', emoji: '' },
  { value: 'reading', label: 'Currently Reading', emoji: '' },
  { value: 'finished', label: 'Finished', emoji: '' },
];

export const BookFilters = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state) => state.books.filter);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => dispatch(setFilter(filter.value))}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {filter.emoji} {filter.label}
        </button>
      ))}
    </div>
  );
};