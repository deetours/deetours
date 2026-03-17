"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-background min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-light text-primary-dark mb-4">Something went wrong!</h2>
        <p className="text-gray-500 mb-8 max-w-md">We encountered an unexpected error. Our team has been notified.</p>
        <button
          className="px-8 py-4 bg-accent-luxury text-white rounded-full transition-transform hover:scale-105"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
