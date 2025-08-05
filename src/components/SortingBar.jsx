export default function SortingBar() {
  return (
    <>
      <div className="flex flex-row w-full shadow-md bg-white p-4 px-6 gap-4 items-center rounded-2xl">
        <h2>Urutkan</h2>
        <div className="lg:flex gap-6 hidden  py-2.5">
          <button className="border-black border-2 font-medium  text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Terbaru
          </button>
          <button className="border-black border-2 font-medium text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Termurah
          </button>
          <button className="border-black border-2 font-medium text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Termahal
          </button>
          <button className="border-black border-2 font-medium text-black px-6 py-2.5 rounded-2xl hover:bg-black hover:text-white transition-colors">
            Rating Tertinggi
          </button>
        </div>
      </div>
    </>
  );
}
