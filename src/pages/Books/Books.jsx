import React, { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Book from "../Book/Book";

const Books = ({ data = [] }) => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(data.map((book) => book.category).filter(Boolean)),
  ];

  const filteredBooks = useMemo(() => {
    return data.filter((book) => {
      const matchesSearch =
        book.bookName?.toLowerCase().includes(search.toLowerCase()) ||
        book.author?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [data, search, selectedCategory]);

  return (
    <section
      id="books"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24"
    >
      <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 sm:text-sm">
            A world of stories
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Explore Books<span className="text-orange-600">.</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Discover your next favorite book from our collection of stories,
            knowledge, and inspiration.
          </p>
        </div>

        <div className="relative w-full md:max-w-sm">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by book or author..."
            className="w-full rounded-full border border-slate-200 bg-white py-4 pl-12 pr-5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>
      </div>

      <div className="mt-9 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ${
              selectedCategory === category
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                : "border border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-5 mt-9 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          Showing{" "}
          <span className="font-bold text-slate-900">
            {filteredBooks.length}
          </span>{" "}
          books
        </p>
        <span className="hidden text-xs font-semibold uppercase tracking-wider text-slate-400 sm:block">
          Find your next chapter
        </span>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((singleBook) => (
            <Book key={singleBook.bookId} singleBook={singleBook} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
          <div className="text-5xl">📚</div>
          <h3 className="mt-5 text-2xl font-bold text-slate-900">
            No books found
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Try searching with a different title or selecting another category.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};

export default Books;
