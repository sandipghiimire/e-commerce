import { useState, useEffect } from "react";
import { 
  Baby, ChevronLeft, ChevronRight, Star, StarHalf, 
  Quote, User, ArrowRight, ArrowLeft 
} from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);

  const testimonialsList = [
    {
      name: "Alex Johnson",
      title: "Senior Developer",
      company: "Tech Innovations Inc.",
      description: "This platform completely transformed our team's workflow. The intuitive interface and powerful features have saved us countless hours. Since implementation, we've seen a 35% increase in productivity and a significant reduction in errors.",
      rating: 4.5,
      image: <Baby className="text-blue-500" size={40} />
    },
    {
      name: "Sarah Williams",
      title: "Product Manager",
      company: "Global Solutions",
      description: "I've tried multiple solutions in the past, but nothing compares to this. The attention to detail in the user experience is remarkable. Our customer satisfaction scores have increased by 42% since we started using this platform.",
      rating: 5,
      image: <Baby className="text-purple-500" size={40} />
    },
    {
      name: "Michael Chen",
      title: "CTO",
      company: "StartUp Ventures",
      description: "As a growing startup, we needed a solution that could scale with us. This platform has been instrumental in our growth journey. The seamless integration with our existing tools and the responsive support team made our transition smooth and efficient.",
      rating: 4,
      image: <Baby className="text-green-500" size={40} />
    },
    {
      name: "Emma Rodriguez",
      title: "Marketing Director",
      company: "Brand Masters",
      description: "The analytics capabilities have given us insights we never had before. We've optimized our campaigns based on the data and seen a 28% increase in conversion rates. The customizable reports have become essential for our strategy meetings.",
      rating: 4.5,
      image: <Baby className="text-amber-500" size={40} />
    },
    {
      name: "David Kim",
      title: "Operations Lead",
      company: "Logistics Pro",
      description: "The automation features have revolutionized our supply chain management. We've reduced processing time by 60% and eliminated manual errors. The mobile app allows our team to stay productive even when they're on the go.",
      rating: 5,
      image: <Baby className="text-rose-500" size={40} />
    }
  ];

  const toggleExpand = (index) => {
    if (expandedTestimonial === index) {
      setExpandedTestimonial(null);
    } else {
      setExpandedTestimonial(index);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsList.length - 1 : prevIndex - 1
    );
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-amber-400 fill-amber-400" size={18} />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="text-amber-400 fill-amber-400" size={18} />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={18} />);
    }
    
    return stars;
  };

  return (
    <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of professionals trust our platform to transform their workflows and achieve remarkable results.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsList.map((person, idx) => (
            <div 
              key={idx}
              className={`relative bg-white rounded-xl p-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl ${
                expandedTestimonial === idx ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="absolute top-6 left-6 text-blue-200">
                <Quote size={40} />
              </div>
              
              <div className="flex flex-col items-center pt-8">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 mb-4">
                  <div className="h-full w-full rounded-full bg-white overflow-hidden border-2 border-white flex justify-center items-center">
                    {person.image || (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                        {person.name.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                  <p className="text-gray-600 text-sm">{person.title} • {person.company}</p>
                </div>

                <div className="flex mb-4">
                  {renderStars(person.rating)}
                </div>

                <p className={`text-gray-700 text-center leading-relaxed ${
                  expandedTestimonial === idx ? '' : 'line-clamp-4'
                }`}>
                  {person.description}
                </p>
                
                {person.description.length > 150 && (
                  <button 
                    onClick={() => toggleExpand(idx)}
                    className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {expandedTestimonial === idx ? 'Show less' : 'Read more'}
                    {expandedTestimonial === idx ? 
                      <ChevronLeft size={16} className="ml-1" /> : 
                      <ChevronRight size={16} className="ml-1" />
                    }
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsList.map((person, idx) => (
                <div 
                  key={idx}
                  className="w-full flex-shrink-0 px-2"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="absolute top-6 left-6 text-blue-200">
                      <Quote size={40} />
                    </div>
                    
                    <div className="flex flex-col items-center pt-8">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 mb-4">
                        <div className="h-full w-full rounded-full bg-white overflow-hidden border-2 border-white flex justify-center items-center">
                          {person.image || (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                              {person.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                        <p className="text-gray-600 text-sm">{person.title} • {person.company}</p>
                      </div>

                      <div className="flex mb-4">
                        {renderStars(person.rating)}
                      </div>

                      <p className="text-gray-700 text-center leading-relaxed">
                        {person.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-blue-600" size={24} />
            </button>
            
            <div className="flex items-center space-x-2">
              {testimonialsList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    currentIndex === idx ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-blue-600" size={24} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <p className="text-gray-600 mt-2">Customer Satisfaction</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600">4.8/5</div>
            <p className="text-gray-600 mt-2">Average Rating</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-600">10K+</div>
            <p className="text-gray-600 mt-2">Active Users</p>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-amber-600">24/7</div>
            <p className="text-gray-600 mt-2">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
}