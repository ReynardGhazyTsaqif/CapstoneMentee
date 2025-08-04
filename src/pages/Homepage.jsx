import heroimage from "../assets/img/heroimage.jpg";
import bannerimage from "../assets/img/bannerimage.jpg";
import SearchField from "../components/SearchField";
import MenuIcons from "../components/menuicons";
import Card from "../components/CardShoes";

//test card
const products = [
  {
    id: 1,
    name: "Nike Air Max",
    description: "Running Sneaker",
    price: "$120",
    rating: "4.9",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    description: "Comfort & Style",
    price: "$180",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 3,
    name: "Puma Classic",
    description: "Suede Finish",
    price: "$65",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
  {
    id: 4,
    name: "New Balance 574",
    description: "Vintage Look",
    price: "$85",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842",
  },

  {
    id: 5,
    name: "Nike Air Max",
    description: "Running Sneaker",
    price: "$120",
    rating: "4.9",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 6,
    name: "Adidas Ultraboost",
    description: "Comfort & Style",
    price: "$180",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  },
  {
    id: 7,
    name: "Puma Classic",
    description: "Suede Finish",
    price: "$65",
    rating: "4.7",
    imageUrl: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
  },
  {
    id: 8,
    name: "New Balance 574",
    description: "Vintage Look",
    price: "$85",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1579338559194-a162d19bf842",
  },
];
// End of test card

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
            <div className="flex flex-col items-center justify-center py-10">
              <h2 className="font-semibold text-4xl">Crafter To Be Noticed</h2>
              <h3 className="font-medium text-center text-black mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </h3>
            </div>

            {/* Card Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
              {products.map((product) => (
                <Card
                  imageUrl={product.imageUrl}
                  name={product.name}
                  description={product.description}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
            </div>
            {/* End of Card Section */}

            {/* Exclusive Section */}
            <section className="container mx-auto pb-20">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center mt-20 lg:mt-40 px-6 md:px-10 gap-12 mb-20">
                <div className="w-full lg:w-2/3 flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                  <h1 className="text-4xl lg:text-5xl font-medium">
                    Exclusive Only For You
                  </h1>
                  <p className="max-w-xl text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                  <button className="border-black border-2 text-black px-8 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-semibold">
                    Check it Out
                  </button>
                </div>
                <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                  <img
                    src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb"
                    alt="Exclusive Shoes"
                    className="w-full max-w-sm lg:max-w-md h-auto object-cover rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </section>
            {/* End of Exclusive Section */}
          </div>
          {/* End of content-section*/}
        </div>
      </div>
    </>
  );
}
