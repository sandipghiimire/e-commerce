import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(null);

  // Slider settings with enhanced responsiveness
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px"
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px"
        }
      }
    ],
    appendDots: dots => (
      <div className="mt-8">
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
        i === isHovering ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6" : "bg-blue-200"
      }`}></div>
    )
  };

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/collection");
        const data = await res.json();
        setCollections(data);
      } catch (error) {
        toast.error("Failed to load collections");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCollections();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mx-auto mb-6 animate-pulse"></div>
            <div className="h-4 w-48 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 h-[400px] shadow-lg animate-pulse">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl w-full h-56 mb-6"></div>
                <div className="h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-3/4 mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-full mb-4"></div>
                <div className="h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-5/6 mb-6"></div>
                <div className="h-10 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!isLoading && collections.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Discover Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Curated selections designed to elevate your style
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto shadow-lg">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl w-full h-64 flex flex-col items-center justify-center mb-8">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-gray-600 text-lg">No collections available yet</p>
              <p className="text-gray-500 mt-2 max-w-md">We're preparing some amazing collections for you!</p>
            </div>
            <Link href="/products">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                Browse Products
                <ArrowRight size={18} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Our Collections
          </h1>
        </div>

        <Slider {...settings}>
          {collections.map((collection) => (
            <div 
              key={collection._id} 
              className="px-2 sm:px-4"
              onMouseEnter={() => setIsHovering(collections.indexOf(collection))}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div 
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group h-full border border-gray-100"
              >
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  {collection.image ? (
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p>Collection Image</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-2xl font-bold text-white drop-shadow-lg">{collection.name}</h3>
                    <p className="text-blue-100 max-w-xs drop-shadow-md">{collection.subtitle}</p>
                  </div>
                  
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      Featured
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-500 text-sm font-medium">
                      {collection.products?.length || 12} products
                    </span>
                    <Link href={`/${collection._id}`}>
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium group-hover:gap-2 transition-all">
                        Shop Collection
                        <ChevronRight size={18} className="mt-0.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </Link>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {collection.products?.slice(0, 3).map((product, i) => (
                      <div 
                        key={i} 
                        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-1 border border-gray-200 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                      >
                        {product.featureImage ? (
                          <img 
                            src={product.featureImage} 
                            alt={product.title}
                            className="w-16 h-16 object-contain"
                          />
                        ) : (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg w-16 h-16 flex items-center justify-center text-xs text-gray-500">
                            Product
                          </div>
                        )}
                      </div>
                    ))}
                    {(!collection.products || collection.products.length === 0) && (
                      [...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg w-16 h-16 flex items-center justify-center text-xs text-gray-500"
                        >
                          Product
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        <div className="text-center mt-12">
          <Link href="/collections">
            <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
              View All Collections
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}