import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaBookOpen, FaStar } from "react-icons/fa";
import bookImg from "../../assets/books.jpg";

const Banner = () => {
  return (
    <section className="overflow-hidden bg-[#f5f1e9]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-orange-700 shadow-sm">
            <FaStar />
            Discover your next favorite
          </div>

          <h1 className="mt-7 max-w-2xl text-5xl font-black leading-[1.08] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            Every book is a
            <span className="font-serif italic text-orange-600">
              {" "}
              new world.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Find stories that inspire you, ideas that challenge you, and
            adventures that stay with you. Your next great read starts here.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#books"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-8 py-4 font-bold text-white shadow-lg shadow-orange-200 transition duration-300 hover:-translate-y-1 hover:bg-orange-700"
            >
              Explore Books <FaArrowRight />
            </a>

            <Link
              to="/readList"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-8 py-4 font-bold text-slate-800 transition hover:border-orange-500 hover:text-orange-600"
            >
              <FaBookOpen /> My Reading List
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-slate-300/70 pt-7">
            <div>
              <h3 className="text-3xl font-black text-slate-900">Explore</h3>
              <p className="mt-1 text-sm text-slate-500">Different genres</p>
            </div>
            <div className="h-10 w-px bg-slate-300" />
            <div>
              <h3 className="text-3xl font-black text-slate-900">Discover</h3>
              <p className="mt-1 text-sm text-slate-500">New perspectives</p>
            </div>
            <div className="h-10 w-px bg-slate-300" />
            <div>
              <h3 className="text-3xl font-black text-slate-900">Enjoy</h3>
              <p className="mt-1 text-sm text-slate-500">Every chapter</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-orange-200/70 blur-2xl sm:h-48 sm:w-48" />
          <div className="absolute -bottom-6 -left-5 h-36 w-36 rounded-full bg-amber-200/70 blur-2xl" />

          <div className="relative rotate-1 rounded-[2rem] border border-white/70 bg-white p-3 shadow-2xl transition duration-500 hover:rotate-0">
            <img
              src={bookImg}
              alt="A collection of books ready to explore"
              className="h-[280px] w-full rounded-[1.5rem] object-cover sm:h-[400px] lg:h-[470px]"
            />
          </div>

          <div className="absolute -bottom-5 left-2 rounded-2xl bg-white p-4 shadow-xl sm:-left-7 sm:p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
                <FaBookOpen />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Your reading journey
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Begins with one page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
