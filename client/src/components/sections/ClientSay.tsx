import { useState } from "react";
import Comment from "../modules/Comment";
import CorouselNavigation from "../modules/CorouselNavigation";
import { AnimatePresence } from "framer-motion";

const clientComments = [
  {
    name: "Sarah Johnson",
    comment:
      "EPM Tech Services transformed our vision into reality. Their attention to detail and technical expertise is unmatched. Our new platform has increased user engagement by 300%.",
    profession: "CEO, TechStart Inc",
  },
  {
    name: "Michael Chen",
    comment:
      "Working with EPM Tech Services was seamless. They delivered our e-commerce platform ahead of schedule and it exceeded all expectations. Highly recommended!",
    profession: "Founder, ShopFlow",
  },
  {
    name: "Emily Rodriguez",
    comment:
      "The team at EPM Tech Services is exceptional. They built a secure, scalable platform that handles millions of transactions. Their post-launch support is outstanding.",
    profession: "CTO, FinanceHub",
  },
];

const ClientSay = () => {
  const [index, setIndex] = useState(0);

  const indexHandler = (value: number) => {
    setIndex(value);
  };

  return (
    <div className="mt-40 px-8 ">
      <h2 className="text-4xl font-bold text-center">
        What Our{" "}
        <span
          style={{
            backgroundImage: "var(--gradient)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Client Say
        </span>
      </h2>

      <p className="text-center text-white/50">
        Don't just take our word for it - hear from some of our satisfied
        clients.
      </p>

      <div className="flex items-center justify-center w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <Comment data={clientComments[index]} key={index} />
        </AnimatePresence>
      </div>

      <CorouselNavigation cb={indexHandler} />
    </div>
  );
};

export default ClientSay;
