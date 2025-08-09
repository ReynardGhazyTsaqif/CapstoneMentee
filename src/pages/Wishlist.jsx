import heroimage from "../assets/img/heroimage.jpg";
import { Link } from "react-router-dom";
import Card from "../components/CardShoes";
import { useState } from "react";

export default function Whislist() {
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

  return (
    <>
      <div className="flex flex-col">
        {/*hero section */}
        <div
          className="relative w-full h-[50vh] bg-cover bg-center mx-auto"
          style={{ backgroundImage: `url(${heroimage})` }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="flex items-end justify-start h-full p-10">
            <h1 className="text-white text-4xl font-bold">
              Lorem Ipsum Dolor Sit Amet
            </h1>
          </div>
        </div>
        {/*end hero section */}

        <div className="w-full bg-white h-screen">
          <div className="p-8">
            {" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {products.map((product) => (
                <Link key={product.id} to={`/kategori/${product.id}`}>
                  <Card
                    imageUrl={product.imageUrl}
                    name={product.name}
                    description={product.description}
                    rating={product.rating}
                    price={product.price}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
