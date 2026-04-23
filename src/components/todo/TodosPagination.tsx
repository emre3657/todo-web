interface TodosPaginationProps {
  currentPage: number;
  totalPages: number;
  pageLimit: number;
  isFetching: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onLimitChange: (value: number) => void;
}

export function TodosPagination({
  currentPage,
  totalPages,
  pageLimit,
  isFetching,
  onPreviousPage,
  onNextPage,
  onLimitChange,
}: TodosPaginationProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-slate-600">
        Page {currentPage} of {totalPages}
        {isFetching && ' • loading...'}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="cursor-pointer rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <span>Per page:</span>
          <select
            value={pageLimit}
            onChange={(event) => onLimitChange(Number(event.target.value))}
            className="cursor-pointer rounded-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          >
            {[10, 20, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}