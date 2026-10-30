import React from "react";
import { Link } from "react-router";
import { FaStar, FaBookOpen, FaArrowRight } from "react-icons/fa";

const Book = ({ singleBook }) => {
  const {
    bookName,
    image,
    rating,
    category,
    tags = [],
    yearOfPublishing,
    publisher,
    bookId,
  } = singleBook;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl">
      <Link to={`/bookDetails/${bookId}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-[#f2eee6] p-5">
          <div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-600 shadow-sm">
            {category}
          </div>

          <img
            className="h-60 w-full rounded-xl object-contain transition duration-700 group-hover:scale-105 sm:h-64"
            src={image}
            alt={bookName}
            loading="lazy"
          />

          <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-orange-600 text-white opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <FaArrowRight />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link to={`/bookDetails/${bookId}`}>
          <h2 className="mt-4 line-clamp-2 text-xl font-extrabold leading-snug text-slate-900 transition group-hover:text-orange-600">
            {bookName}
          </h2>
        </Link>

        <p className="mt-2 text-sm text-slate-500">
          Published by{" "}
          <span className="font-semibold text-slate-700">{publisher}</span>
        </p>

        <div className="mt-auto">
          <div className="my-5 border-t border-dashed border-slate-200" />

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-medium text-slate-500">
              {yearOfPublishing}
            </span>

            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-600">
              <FaStar />
              {rating}
            </div>
          </div>

          <Link
            to={`/bookDetails/${bookId}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800 transition duration-300 hover:border-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Explore Book <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Book;
