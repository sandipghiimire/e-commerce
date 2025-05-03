import { Baby } from "lucide-react"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"

export default function Testimonials() {

    const testimonialsList = [{
        name: "Sandip Ghimire",
        description: "Description is the mode for transmitting a mental image of the particulars of a story. Together with dialogue, narration, exposition, and summarization, it is one of the most widely recognized of the fiction-writing modes. As stated in Writing from A to Z, edited by Kirk Polking, it is more than the amassing of details; it is bringing something to life by carefully choosing and arranging words and phrases to produce the desired effect.",
        image: <Baby />
    },
    {
        name: "Shambhu Ghimire",
        description: "Description is the mode for transmitting a mental image of the particulars of a story. Together with dialogue, narration, exposition, and summarization, it is one of the most widely recognized of the fiction-writing modes. As stated in Writing from A to Z, edited by Kirk Polking, it is more than the amassing of details; it is bringing something to life by carefully choosing and arranging words and phrases to produce the desired effect.",
        image: <Baby />
    },
    {
        name: "Swostik Upreti",
        description: "Description is the mode for transmitting a mental image of the particulars of a story. Together with dialogue, narration, exposition, and summarization, it is one of the most widely recognized of the fiction-writing modes. As stated in Writing from A to Z, edited by Kirk Polking, it is more than the amassing of details; it is bringing something to life by carefully choosing and arranging words and phrases to produce the desired effect.",
        image: <Baby />
    },
    {
        name: "Swostik Ghimire",
        description: "Description is the mode for transmitting a mental image of the particulars of a story. Together with dialogue, narration, exposition, and summarization, it is one of the most widely recognized of the fiction-writing modes. As stated in Writing from A to Z, edited by Kirk Polking, it is more than the amassing of details; it is bringing something to life by carefully choosing and arranging words and phrases to produce the desired effect.",
        image: <Baby />
    },
    ]

    return <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                Voices of Success
                <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {testimonialsList?.map((person, idx) => (
                    <div
                        key={idx}
                        className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-2"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                        <div className="flex flex-col items-center">
                            {/* Profile Image with Gradient Border */}
                            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 mb-6">
                                <div className="h-full w-full rounded-full bg-white overflow-hidden border-2 border-white flex justify-center items-center">
                                    {person.image || (
                                        <div className="h-full w-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                                            {person.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{person.name}</h3>
                                
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 text-center leading-relaxed relative 
                            before:content-['“'] before:absolute before:-top-4 before:-left-2 
                            before:text-3xl before:text-blue-200 before:font-serif before:opacity-75 
                            after:content-['”'] after:absolute after:-bottom-6 after:-right-2 
                            after:text-3xl after:text-blue-200 after:font-serif after:opacity-75 
                            line-clamp-3">
                                {person.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
}