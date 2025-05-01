"use client"
import Header from "./components/Header";
import SimpleSlider from "./components/Sliders";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Collections from "./components/Collections";

export default function Home() {
  return (
    <div>
      <Header />
      <SimpleSlider/>
      <Collections/>
    </div>
  );
}
