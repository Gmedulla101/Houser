import Card from './Card';
import { CIcon } from '@coreui/icons-react';
import { cilArrowThickRight, cilArrowThickLeft } from '@coreui/icons';

type CardProps = {
  imgUrl: string;
  title: string;
  desc: string;
  price: number;
  bedrooms: number;
  bath: number;
  type: string;
  featured: boolean;
};

let scrolledValue = 0;
const showNextCard = () => {
  const cardSlider = document.getElementById('featured');
  if (cardSlider) {
    if (scrolledValue === -2450) {
      scrolledValue = 350;
    }
    cardSlider.style.transition = `0.3s`;
    cardSlider.style.transform = `translateX(${(scrolledValue -= 350)}px)`;
  }
};

const showPrevCard = () => {
  const cardSlider = document.getElementById('featured');
  if (cardSlider) {
    if (scrolledValue === 0) {
      scrolledValue = -2800;
    }
    cardSlider.style.transition = `0.3s`;
    cardSlider.style.transform = `translateX(${(scrolledValue += 350)}px)`;
  }
};

const Slider = ({ sliderDetails }: any) => {
  const sliderEl = sliderDetails.map((feature: CardProps, index: number) => {
    return <Card key={index} {...feature} />;
  });

  return (
    <>
      <div className="featuredCards flex gap-12 pl-1 transiton" id="featured">
        {sliderEl}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 w-fit relative left-[73%] mt-5 md:left-[80%] lg:left-[90%]">
        <button className="border-2 border-black w-10 h-10 rounded-full p-2 transition active:scale-110 cursor-pointer">
          <CIcon icon={cilArrowThickLeft} size="lg" onClick={showPrevCard} />
        </button>
        <button className="border-2 border-black w-10 h-10 rounded-full p-2 transition active:scale-110 cursor-pointer">
          <CIcon icon={cilArrowThickRight} size="lg" onClick={showNextCard} />
        </button>
      </div>
    </>
  );
};

export default Slider;
