import React from "react";
import { Link, useRouteError } from "react-router";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";

const Error = () => {
  const error = useRouteError();

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[#faf9f6] px-5 py-12">
      <div className="relative w-full max-w-xl text-center">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-100/70 blur-3xl" />

        <div className="relative">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-600 text-3xl text-white shadow-xl shadow-orange-200">
            <FaBookOpen />
          </div>

          <p className="mt-8 text-8xl font-black tracking-tighter text-orange-600 sm:text-9xl">
            404
          </p>

          <h1 className="mt-5 text-3xl font-black text-slate-900 sm:text-4xl">
            Lost between the pages?
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
            It looks like this page has wandered off. Don't worry, there's
            always another story waiting for you.
          </p>

          {error?.status && (
            <p className="mt-3 text-xs text-slate-400">
              Error {error.status}: {error.statusText || "Page unavailable"}
            </p>
          )}

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-orange-600"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error;
