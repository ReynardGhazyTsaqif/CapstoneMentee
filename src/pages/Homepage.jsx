import heroimage from "../assets/img/heroimage.jpg";
import bannerimage from "../assets/img/bannerimage.jpg";
import SearchField from "../components/SearchField";
import MenuIcons from "../components/menuicons";

export default function Homepage() {
  return (
    <>
      <div className="bg-black w-full max-h-full">
        <div className="bg-white w-full min-h-screen mx-auto flex flex-col">
          {/*hero-section*/}
          <div
            className="relative w-full h-[75vh] bg-cover bg-center mx-auto"
            style={{ backgroundImage: `url(${heroimage})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50">
              <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-12">
                {/* Teks Atas */}
                <div className="flex">
                  <div className="hidden md:block">
                    <h1 className="text-white md:text-4xl md:font-bold">
                      NAMABRAND
                    </h1>
                  </div>
                  <SearchField />
                  <MenuIcons className="hidden md:flex" />
                </div>

                {/* Teks Bawah */}
                <h1 className="text-white md:text-4xl md:font-bold">
                  Lorem Ipsum <br />
                  Dolor Sit Amet
                </h1>
              </div>
            </div>
          </div>

          {/*end-hero-section*/}

          {/*content-section*/}
          <div className="flex items-center justify-center p-6 py-16">
            <p className="text-gray-700 text-center text-xl font-medium  max-w-3/4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div
            className="relative w-full h-[45vh] bg-cover bg-center mx-auto"
            style={{ backgroundImage: `url(${bannerimage})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="w-full h-[80vh]">
            <div className="flex items-center justify-center py-10">
              <h2 className="font-semibold text-4xl">Crafter To Be Noticed</h2>
            </div>
          </div>
          {/*content-section*/}
        </div>
      </div>
    </>
  );
}
