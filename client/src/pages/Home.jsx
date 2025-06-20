import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

const steps = [
  {
    title: "Create Effortlessly",
    desc: "Start typing or import your ideas — your note is just a click away.",
    icon: "fa-solid fa-pen-nib",
    animate: "fa-bounce",
  },
  {
    title: "Enhance With AI",
    desc: "Use prompts to rewrite, summarize, or polish your notes instantly.",
    icon: "fa-solid fa-wand-magic-sparkles",
    animate: "fa-beat",
  },
  {
    title: "Drag. Drop. Done.",
    desc: "Organize your canvas visually. Prioritize what matters.",
    icon: "fa-solid fa-arrows-up-down-left-right",
    animate: "fa-fade",
  },
];

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex flex-col-reverse lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            AI-Powered Notes That Think With You
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Create, organize, and enhance your thoughts with smart assistance —
            all in one minimalist app.
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 text-white bg-primary/90  text-sm font-semibold hover:bg-primary transition"
          >
            Get Started For Free
          </Link>
        </div>
        <div className="flex-1">
          <img
            src={heroImg}
            alt="Hero Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </section>

      <section className="relative bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            How It Works
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {steps.map(({ title, desc, icon, animate }, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 p-6 hover:shadow-sm transition"
              >
                <div className="text-4xl text-primary mb-4">
                  <i className={`${icon} ${animate}`}></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Built With Modern Tech</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm font-medium text-gray-700">
            {[
              "React + Vite",
              "TailwindCSS",
              "Node.js",
              "MongoDB",
              "OpenRouter AI",
              "Tiptap Editor",
              "Dnd-kit",
            ].map((tech, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100  border border-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t text-sm py-6 text-center text-gray-600">
        <div className="max-w-6xl mx-auto px-4">
          © {new Date().getFullYear()} NoteVerse — Built with ❤️ for
          productivity
        </div>
      </footer>
    </div>
  );
};

export default Home;
