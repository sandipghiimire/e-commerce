"use client"
import Header from "./components/Header";
import SimpleSlider from "./components/Sliders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Collections from "./components/Collections";
import Categories from "./components/Categories";
import ProductList from "./components/Product";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-screen overflow-x-hidden h-screen overflow-y-auto">
        <Header />
        <SimpleSlider />
        <Collections />
        <Categories />
        <ProductList/>
        <Testimonials/>
        <Footer/>
    </div>
  );
}
