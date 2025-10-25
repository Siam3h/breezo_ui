import { TypeAnimation } from "react-type-animation";

const AlternatingTagline = () => {
  return (
    <div className="text-center">
      <p className="inline text-base sm:text-lg md:text-xl text-white">
        Rent{" "}
        <span className="font-bold text-breezo-green">
          <TypeAnimation
            sequence={["Fast", 2000, "Clean", 2000, "Affordable", 2000]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            speed={20}
            deletionSpeed={20}
          />
        </span>{" "}
        E-Bikes and E-Scooters for your daily commute.
      </p>
    </div>
  );
};

export default AlternatingTagline;
