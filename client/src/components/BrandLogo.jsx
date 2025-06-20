import { Link } from "react-router-dom";

export default function BrandLogo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 group">
      {/* Gradient border */}
      <div className="p-[2px] rounded-full bg-gradient-to-r from-primary to-pink-500">
        <div className="bg-white text-primary p-2 w-8 h-8 rounded-full flex items-center">
          <i className="fas fa-pen-nib text-lg group-hover:rotate-[15deg] transition-transform duration-300" />
        </div>
      </div>

      {/* Brand name */}
      <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition">
        NoteVerse
      </span>
    </Link>
  );
}
