export default function SearchField() {
  return (
    <>
      <div className="flex md:relative justify-center items-center w-full">
        <div className=" flex justify-center w-4/5 md:w-9/12">
          <input
            type="text"
            placeholder="Search..."
            className="w-9/12 border-slate-50 rounded-2xl  border-2 p-2 text-white focus:outline-none focus:border-white"
          ></input>
        </div>
      </div>
    </>
  );
}
