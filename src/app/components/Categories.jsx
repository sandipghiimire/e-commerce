import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { ChevronRight } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  // Responsive settings for all screen sizes
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "40px"
        }
      }
    ]
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        toast.error("Failed to load categories");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Shop By Category
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products organized by category
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 mb-4 animate-pulse"></div>
                <div className="h-5 w-3/4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-10">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-10 max-w-md mx-auto">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Available</h3>
              <p className="text-gray-600 mb-6">We're adding new categories soon!</p>
              <Link href="/products">
                <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                  Browse Products
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="relative px-4">
            <Slider {...settings}>
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  className="px-2"
                  onMouseEnter={() => setActiveCategory(category._id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <Link href={`/categories/${category?._id}`}>
                    <div className="flex flex-col items-center p-4 transition-all duration-300 hover:scale-105">
                      <div className={`relative rounded-full p-1 mb-4 transition-all ${
                        activeCategory === category._id 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg' 
                          : 'bg-gradient-to-r from-blue-100 to-purple-100 shadow-md'
                      }`}>
                        <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                          {category.image ? (
                            <img 
                              src={category.image} 
                              alt={category.name}
                              className="w-16 h-16 object-contain"
                            />
                          ) : (
                            <div className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-16 h-16 flex items-center justify-center">
                              <div className="text-xl">📦</div>
                            </div>
                          )}
                        </div>
                        
                        {activeCategory === category._id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                              View
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <h3 className={`font-semibold text-center transition-colors ${
                        activeCategory === category._id ? 'text-blue-600' : 'text-gray-800'
                      }`}>
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
        
        <div className="text-center mt-10">
          <Link href="/categories">
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
              View All Categories
              <ChevronRight size={18} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}