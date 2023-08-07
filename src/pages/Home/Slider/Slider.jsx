import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Container from "../../../components/shared/Container/Container";
import Loader from "../../../components/shared/Loader/Loader";
const Slider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://electronic-store-server.vercel.app/slider")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="relative mb-20 overflow-hidden">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          className="mySwiper"
        >
          {devices.map(
            ({ picture, id, name, price, description, quantity, rating }) => (
              <SwiperSlide key={id}>
                <div className=" flex w-full h-screen items-center">
                  <div className="w-3/4 h-full">
                    <img
                      className="w-full h-full object-cover"
                      src={picture}
                      alt=""
                    />
                  </div>

                  <div className="w-1/3 h-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-500 p-5">
                    <div className="space-y-2 text-gray-200">
                      <p className="text-xl font-medium ">{name}</p>
                      <p className="text-base font-medium ">Price : ${price}</p>

                      <p className="text-base font-medium ">{description}</p>
                      <p className="text-base font-medium ">
                        Quantity: {quantity}
                      </p>
                      <p className="flex items-center gap-3">
                        <span>Rating: {rating} </span>{" "}
                        <Rating
                          style={{ maxWidth: 140 }}
                          value={rating}
                          readOnly
                        />
                      </p>

                      <div className="pt-6 mt-auto">
                        <button className="bg-pink-600 w-3/5 px-3 py-3 rounded-3xl text-2xl font-medium hover:bg-pink-700">
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          )}

          <div className="autoplay-progress absolute" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}></svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </Container>
  );
};

export default Slider;
