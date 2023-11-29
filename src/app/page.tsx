"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.5,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.02 * direction;
  };

  return (
    <>
      <main className="relative flex h-[100vh] mb-[100vh] overflow-hidden">
        <Image
          className="object-cover"
          src="/images/background.jpg"
          fill={true}
          alt="background"
        />
        <div className="absolute top-[calc(100vh-350px)]">
          <div ref={slider} className="relative whitespace-nowrap">
            <Image
              className="relative ml-20 text-white text-[230px] font-[500] pr-[50px]"
              ref={firstText}
              src="/images/names-long.png"
              width={2000}
              height={2000}
              alt="names"
            />

            <Image
              className="m-0 text-white text-[230px] font-[500] pr-[50px] absolute left-full top-0"
              ref={secondText}
              src="/images/names-long.png"
              width={2000}
              height={2000}
              alt="names"
            />
          </div>
        </div>
      </main>
    </>
  );
}
