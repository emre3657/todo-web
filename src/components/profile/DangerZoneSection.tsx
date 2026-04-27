interface DangerZoneSectionProps {
  deleteError: string | null;
  onDeleteClick: () => void;
}

export function DangerZoneSection({
  deleteError,
  onDeleteClick,
}: DangerZoneSectionProps) {
  return (
    <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-rose-700">Danger Zone</h2>
        <p className="mt-1 text-sm text-rose-600">
          Permanently delete your account and all associated data.
        </p>
      </div>

      {deleteError ? (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-white px-4 py-3 text-sm text-rose-700">
          {deleteError}
        </div>
      ) : null}

      <button
        type="button"
        onClick={onDeleteClick}
        className="cursor-pointer rounded-2xl border border-rose-300 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
      >
        Delete Account
      </button>
    </section>
  );
}