import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="bg-black h-5/12 w-full pt-4 pb-6">
        <div className="flex flex-row bg-white py-15 md:px-10 px-5 justify-between">
          <div className="mr-6 md:mr-0">
            <h2 className="md:text-2xl text-xl mb-8 font-semibold">SHOEZY</h2>
            <h3 className="font-medium md:text-xl text-xs">Every walk</h3>
            <h3 className="font-medium md:text-xl text-xs">Have Impact</h3>
          </div>

          <div className="flex md:gap-18 gap-4">
            {/*Navigasi */}
            <div>
              <ul className="flex flex-col md:gap-2">
                <li>
                  <Link to={`/`}>Beranda</Link>
                </li>
                <li>
                  <Link to={`/kategori`}>Produk</Link>
                </li>
                <li>
                  <Link to={``}>Keranjang Belanja</Link>
                </li>
              </ul>
            </div>
            {/*End Navigasi */}

            {/*Icons */}
            <div className="flex flex-col gap-2">
              <div className="md:mb-6">
                <h1 className="font-medium">Sosial Media</h1>
                <h2>
                  Untuk Update Informasi <br /> Ikuti Sosial Media Kami
                </h2>
              </div>

              <div className="flex md:gap-4 gap-1.5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-1.004zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-instagram"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              {/*Icons End */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center text-white pt-2">
          <p> © 2025 SHOEZY | All Right Reserved</p>
        </div>
      </div>
    </>
  );
}
