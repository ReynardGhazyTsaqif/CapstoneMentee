import { Link } from "react-router-dom";

// Komponen untuk ikon pemisah (chevron right)
const Separator = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {crumbs.map((crumb, index) => {
          // Cek apakah ini crumb terakhir atau bukan
          const isLast = index === crumbs.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              {/* Jika bukan yang terakhir, buat menjadi link */}
              {!isLast ? (
                <Link
                  to={crumb.path}
                  className="text-gray-500 hover:text-blue-600 hover:underline"
                >
                  {crumb.label}
                </Link>
              ) : (
                // Jika yang terakhir, tampilkan sebagai teks biasa
                <span className="font-semibold text-gray-700">
                  {crumb.label}
                </span>
              )}

              {/* Tampilkan pemisah jika bukan crumb terakhir */}
              {!isLast && <Separator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
