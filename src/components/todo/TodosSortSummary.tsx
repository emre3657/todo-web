interface TodosSortSummaryProps {
  sorts: string[];
  sortLabel: Record<string, string>;
  onRemoveSort: (value: string) => void;
}

export function TodosSortSummary({
  sorts,
  sortLabel,
  onRemoveSort,
}: TodosSortSummaryProps) {
  return (
    <div className="flex flex-row flex-wrap items-center gap-1">
      {sorts.length === 0 && (
        <span className="rounded-3xl bg-slate-100 px-3 py-2 text-[13px] text-slate-700">
          Default: Newest created
        </span>
      )}

      {sorts.map((value) => (
        <span
          key={value}
          className="flex flex-row items-center justify-center gap-2 rounded-3xl bg-slate-100 px-3 py-2 text-[13px] text-slate-700"
        >
          <span>{sortLabel[value] ?? value}</span>
          <button
            type="button"
            onClick={() => onRemoveSort(value)}
            className="cursor-pointer flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[14px] text-slate-700 transition hover:bg-slate-200"
            aria-label="Remove sort"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}