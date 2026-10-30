import React from "react";
import { Link, useLoaderData, useParams } from "react-router";
import { FaStar, FaBookOpen, FaBookmark, FaArrowLeft } from "react-icons/fa";
import { addToStoredDB, getStoredBook } from "../../Utility/AddtoDB";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams();
  const data = useLoaderData();

  const singleBook = data.find((book) => String(book.bookId) === String(id));

  if (!singleBook) {
    return (
      <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-4xl font-black text-slate-900">Book Not Found</h1>
        <p className="mt-3 text-slate-500">
          Sorry, we couldn't find the book you're looking for.
        </p>
        <Link
          to="/"
          className="mt-7 rounded-full bg-orange-600 px-7 py-3 font-bold text-white transition hover:bg-orange-700"
        >
          Back to Home
        </Link>
      </section>
    );
  }

  const {
    bookName,
    image,
    author,
    category,
    review,
    publisher,
    tags = [],
    rating,
    totalPages,
    yearOfPublishing,
    bookId,
  } = singleBook;

  const handleMarkAsRead = () => {
    const alreadySaved = getStoredBook().some(
      (savedId) => String(savedId) === String(bookId),
    );

    if (alreadySaved) {
      toast.info("This book is already in your reading list!");
      return;
    }

    addToStoredDB(bookId);
    toast.success("Book added to your reading list!");
  };

  const handleAddToWishList = () => {
    const currentWishList = JSON.parse(
      localStorage.getItem("wishList") || "[]",
    );

    const alreadySaved = currentWishList.some(
      (savedId) => String(savedId) === String(bookId),
    );

    if (alreadySaved) {
      toast.info("This book is already in your wish list!");
      return;
    }

    currentWishList.push(String(bookId));
    localStorage.setItem("wishList", JSON.stringify(currentWishList));

    toast.success("Added to your wish list!");
  };

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
      <ToastContainer position="top-right" autoClose={2500} />

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-orange-600"
      >
        <FaArrowLeft /> Back to collection
      </Link>

      <div className="mt-8 grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12">
        <div className="flex items-center justify-center rounded-[1.5rem] bg-[#f3efe7] p-6 sm:p-10">
          <img
            src={image}
            alt={bookName}
            className="max-h-[520px] w-full max-w-sm rounded-xl object-contain shadow-xl transition duration-500 hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-col justify-center py-3">
          <span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-orange-700">
            {category}
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl">
            {bookName}
          </h1>

          <p className="mt-4 text-base text-slate-500">
            By <span className="font-bold text-slate-800">{author}</span>
          </p>

          <div className="my-7 border-t border-slate-200" />

          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-600">
              <FaStar /> {rating}
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {totalPages} Pages
            </span>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {yearOfPublishing}
            </span>
          </div>

          <h3 className="mt-8 text-lg font-extrabold text-slate-900">
            About this book
          </h3>

          <p className="mt-3 text-sm leading-8 text-slate-600 sm:text-base">
            {review}
          </p>

          <div className="mt-7">
            <h3 className="text-sm font-bold text-slate-900">Book Tags</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full bg-orange-50 px-4 py-2 text-xs font-semibold text-orange-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="my-7 border-t border-slate-200" />

          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs text-slate-400">Publisher</p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {publisher}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Published Year</p>
              <p className="mt-1 text-sm font-bold text-slate-800">
                {yearOfPublishing}
              </p>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleMarkAsRead}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700"
            >
              <FaBookOpen /> Mark as Read
            </button>

            <button
              onClick={handleAddToWishList}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-4 text-sm font-bold text-slate-800 transition hover:border-orange-500 hover:bg-orange-50 hover:text-orange-600"
            >
              <FaBookmark /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
