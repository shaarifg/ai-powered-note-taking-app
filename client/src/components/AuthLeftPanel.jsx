import pattern1 from "../assets/patterns/polygon.svg";
import pattern2 from "../assets/patterns/line-art.svg";

export default function AuthLeftPanel({ heading, text }) {
  return (
    <div className="hidden sm:flex flex-1 items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden text-white px-8 py-12">
      {/* SVG decorations */}
      <img
        src={pattern2}
        className="absolute top-0 left-0 w-64 opacity-20 animate-pulse"
        alt=""
      />
      <img
        src={pattern1}
        className="absolute bottom-0 right-0 w-64 opacity-20 animate-spin-slow"
        alt=""
      />

      {/* Text */}
      <div className="max-w-md text-center z-10">
        <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">
          {heading}
        </h2>
        <p className="text-sm text-gray-300 animate-fade-in">{text}</p>
      </div>
    </div>
  );
}
