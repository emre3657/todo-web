import { Link } from 'react-router';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

export function ProfileHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Account Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Update your profile details, change your password, and manage your account.
        </p>
      </div>

      <Link
        to="/todos"
        className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        <ArrowLeftCircleIcon className="h-5 w-5" />
        <span>Todos</span>
      </Link>
    </div>
  );
}