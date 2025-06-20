import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";

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

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              {
                title: "Create Effortlessly",
                desc: "Start typing or import your ideas — your note is just a click away.",
                icon: "📝",
              },
              {
                title: "Enhance With AI",
                desc: "Use prompts to rewrite, summarize, or polish your notes instantly.",
                icon: "⚡",
              },
              {
                title: "Drag. Drop. Done.",
                desc: "Organize your canvas visually. Prioritize what matters.",
                icon: "📌",
              },
            ].map(({ title, desc, icon }, idx) => (
              <div key={idx} className="bg-white  p-6  border border-gray-200">
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
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
