"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Page Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <h2 className="text-4xl font-light text-primary-dark mb-4">An error occurred</h2>
      <p className="text-gray-500 mb-8 max-w-md">We couldn't load this page. Please try again or return home.</p>
      <button
        onClick={() => reset()}
        className="px-8 py-4 bg-accent-luxury text-white rounded-full transition-transform hover:scale-105"
      >
        Try again
      </button>
    </div>
  )
}

