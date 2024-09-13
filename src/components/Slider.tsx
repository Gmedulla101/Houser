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

const Slider = ({ features }: any) => {
  const featuredEl = features.map((feature: CardProps, index: number) => {
    return <Card key={index} {...feature} />;
  });

  return (
    <>
      <div className="featuredCards flex gap-12 pl-16 transiton" id="featured">
        {featuredEl}
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3 w-full relative left-3/4 mt-5">
        <CIcon
          icon={cilArrowThickLeft}
          size="lg"
          className="border-2 border-black w-10 h-10 rounded-full p-2 transition active:scale-110 cursor-pointer"
          onClick={showPrevCard}
        />
        <CIcon
          icon={cilArrowThickRight}
          size="lg"
          className="border-2 border-black w-10 h-10 rounded-full p-2 transition active:scale-110 cursor-pointer"
          onClick={showNextCard}
        />
      </div>
    </>
  );
};

export default Slider;
