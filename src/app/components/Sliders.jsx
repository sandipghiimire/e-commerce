import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function SimpleSlider() {
  const [features, setFeatures] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Custom arrow components
  const PrevArrow = (props) => (
    <button 
      {...props} 
      className="absolute left-4 z-10 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Previous slide"
    >
      <ArrowLeft size={24} />
    </button>
  );
  
  const NextArrow = (props) => (
    <button 
      {...props} 
      className="absolute right-4 z-10 bg-white/70 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Next slide"
    >
      <ArrowRight size={24} />
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: i => (
      <div className={`w-3 h-3 rounded-full transition-all ${
        i === currentSlide ? "bg-white w-6" : "bg-white/50"
      }`}></div>
    )
  };

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products");
        const data = await res.json();
        
        // Filter featured products
        const featuredItems = data.filter((item) => item.isFeature === true);
        
        // Add random ratings and reviews for UI since API doesn't provide
        const featuredWithDetails = featuredItems.map(item => ({
          ...item,
          // Format title to ensure it fits in three lines
          formattedTitle: formatTitle(item.title),
          rating: 4.2 + (Math.random() * 0.8), // Random rating between 4.2-5.0
          reviewCount: Math.floor(Math.random() * 100) + 10 // Random reviews between 10-110
        }));
        
        setFeatures(featuredWithDetails);
      } catch (error) {
        toast.error("Failed to load featured products");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  // Format title to fit in three lines
  const formatTitle = (title) => {
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let i = 0; i < words.length; i++) {
      if ((currentLine + words[i]).length <= 20 && lines.length < 3) {
        currentLine += (currentLine ? ' ' : '') + words[i];
      } else {
        if (lines.length < 3) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          // If we already have three lines, break
          break;
        }
      }
    }
    
    if (currentLine && lines.length < 3) {
      lines.push(currentLine);
    }
    
    return lines.join('<br>');
  };

  // Calculate discount percentage
  const getDiscount = (saleprice, sale) => {
    return Math.round(((sale - saleprice) / sale) * 100);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-gradient-to-r from-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  // Empty state
  if (!isLoading && features.length === 0) {
    return (
      <div className="w-full py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">No Featured Products</h2>
          <p className="text-xl mb-8">We're preparing some amazing products for you!</p>
          <Link href="/products">
            <button className="px-6 py-3 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-100 transition-colors">
              Browse All Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-indigo-900/70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCAxMGgxMHYxMEgxMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] bg-repeat opacity-10"></div>
      </div>
      
      <Slider {...settings}>
        {features?.map((item) => {
          const discount = getDiscount(item.saleprice, item.sale);
          
          return (
            <div key={item._id}>
              <div className="flex flex-col-reverse md:flex-row items-center gap-8 p-6 md:p-12 md:py-16 md:px-16 lg:px-24 max-w-7xl mx-auto">
                {/* Left Side - Text Section */}
                <div className="flex-1 flex flex-col gap-5 md:gap-6 text-center md:text-left z-10">
                  {discount > 0 && (
                    <div className="inline-block bg-gradient-to-r from-red-500 to-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-2 animate-pulse">
                      {discount}% OFF - LIMITED TIME
                    </div>
                  )}
                  
                  <Link href={`/products/${item?._id}`}>
                    <h1 
                      className="text-3xl md:text-4xl font-bold text-white leading-tight"
                      dangerouslySetInnerHTML={{ __html: item.formattedTitle }}
                    />
                  </Link>
                  
                  <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto md:mx-0 md:pr-10">
                    {item?.shortDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mt-4 justify-center md:justify-start">
                    <Link href={`/products/${item?._id}`}>
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5">
                        SHOP NOW
                        <ArrowRight size={18} />
                      </button>
                    </Link>
                    
                    <Link href="/wishlist">
                      <button className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-medium rounded-lg border border-white/30 transition-all duration-300">
                        <Heart size={18} />
                        Add to Wishlist
                      </button>
                    </Link>
                  </div>
                  
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                    <div className="flex items-center">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-blue-100 text-sm">
                        ({item.reviewCount} Reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">
                        रु {item.saleprice.toLocaleString()}
                      </span>
                      {item.sale > item.saleprice && (
                        <span className="text-lg text-blue-200 line-through">
                          रु {item.sale.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="flex justify-center items-center w-full md:w-1/2 z-10">
                  <Link href={`/products/${item?._id}`}>
                    <div className="relative group">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-2xl inline-block">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
                          {item.featureImage ? (
                            <img
                              src={item.featureImage}
                              alt={item.title}
                              className="w-80 h-80 md:w-96 md:h-96 object-contain"
                            />
                          ) : (
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-80 h-80 md:w-96 md:h-96 flex items-center justify-center text-gray-400">
                              Product Image
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-bold shadow-lg group-hover:animate-bounce">
                        Featured Product
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl"></div>
    </div>
  );
}