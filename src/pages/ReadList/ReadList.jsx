import React, { useEffect, useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router";
import {
  FaBookOpen,
  FaBookmark,
  FaSortAmountDown,
  FaTrash,
} from "react-icons/fa";
import Book from "../Book/Book";
import { getStoredBook } from "../../Utility/AddtoDB";

const ReadList = () => {
  const data = useLoaderData();

  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [sort, setSort] = useState("");
  const [activeTab, setActiveTab] = useState("read");

  useEffect(() => {
    const readIds = getStoredBook().map(String);

    let wishIds = [];
    try {
      wishIds = JSON.parse(localStorage.getItem("wishList") || "[]").map(
        String,
      );
    } catch {
      wishIds = [];
    }

    setReadList(data.filter((book) => readIds.includes(String(book.bookId))));

    setWishList(data.filter((book) => wishIds.includes(String(book.bookId))));
  }, [data]);

  const displayedBooks = useMemo(() => {
    const books = activeTab === "read" ? readList : wishList;

    if (!sort) return books;

    return [...books].sort((a, b) => {
      if (sort === "pages") {
        return a.totalPages - b.totalPages;
      }

      if (sort === "ratings") {
        return b.rating - a.rating;
      }

      return 0;
    });
  }, [readList, wishList, activeTab, sort]);

  const handleRemove = (bookId) => {
    if (activeTab === "read") {
      const updated = readList.filter(
        (book) => String(book.bookId) !== String(bookId),
      );

      setReadList(updated);

      const savedIds = updated.map((book) => String(book.bookId));
      localStorage.setItem("readList", JSON.stringify(savedIds));
    } else {
      const updated = wishList.filter(
        (book) => String(book.bookId) !== String(bookId),
      );

      setWishList(updated);

      const savedIds = updated.map((book) => String(book.bookId));
      localStorage.setItem("wishList", JSON.stringify(savedIds));
    }
  };

  const currentCount = activeTab === "read" ? readList.length : wishList.length;

  return (
    <section className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-[2rem] bg-[#f3efe7] px-6 py-12 sm:px-12 sm:py-16">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-orange-200/50 blur-3xl" />

        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 sm:text-sm">
            Your personal collection
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Your Reading
            <span className="font-serif italic text-orange-600"> Space.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Keep track of the stories you've enjoyed and the books you're
            looking forward to reading. Your collection, your journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-black text-slate-900">
                {readList.length}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Books Read
              </p>
            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <p className="text-2xl font-black text-slate-900">
                {wishList.length}
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Wishlisted
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex w-full rounded-xl border border-slate-200 bg-white p-1 sm:w-fit">
          <button
            onClick={() => {
              setActiveTab("read");
              setSort("");
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition sm:flex-none sm:px-6 ${
              activeTab === "read"
                ? "bg-orange-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <FaBookOpen />
            Read Books
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {readList.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("wish");
              setSort("");
            }}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition sm:flex-none sm:px-6 ${
              activeTab === "wish"
                ? "bg-orange-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <FaBookmark />
            Wishlist
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {wishList.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <FaSortAmountDown className="text-slate-400" />
          <label
            htmlFor="book-sort"
            className="text-sm font-semibold text-slate-600"
          >
            Sort by:
          </label>
          <select
            id="book-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-w-32 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-orange-500"
          >
            <option value="">Default</option>
            <option value="pages">Pages (Low to High)</option>
            <option value="ratings">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="mb-6 mt-8 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
          {activeTab === "read" ? "Books I've Read" : "Books to Read"}
        </h2>
        <span className="text-sm text-slate-500">
          {currentCount} {currentCount === 1 ? "book" : "books"}
        </span>
      </div>

      {displayedBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedBooks.map((book) => (
            <div key={book.bookId} className="relative flex flex-col">
              <Book singleBook={book} />

              <button
                onClick={() => handleRemove(book.bookId)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-600 hover:text-white"
              >
                <FaTrash className="text-xs" />
                Remove from {activeTab === "read" ? "Read List" : "Wishlist"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-3xl text-orange-600">
            {activeTab === "read" ? <FaBookOpen /> : <FaBookmark />}
          </div>

          <h3 className="mt-6 text-2xl font-black text-slate-900">
            {activeTab === "read"
              ? "Your reading list is empty."
              : "Your wishlist is waiting."}
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
            {activeTab === "read"
              ? "Discover a book you love and mark it as read. It will appear here."
              : "Save books that catch your attention and come back to them whenever you like."}
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex rounded-full bg-orange-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-orange-700"
          >
            Explore Books
          </Link>
        </div>
      )}
    </section>
  );
};

export default ReadList;
