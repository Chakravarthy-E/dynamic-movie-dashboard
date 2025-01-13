"use client";

import { useState } from "react";
import Link from "next/link";
import { useMovieStore } from "@/lib/store";
import AddMovie from "@/components/modals/add-movie";

export default function MoviePage() {
  const movies = useMovieStore((state) => state.movies);

  const [isOpen, setIsOpen] = useState(false);

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No movies found</h2>
          <p className="text-muted-foreground">
            Add your first movie to get started.
          </p>

          <AddMovie isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Movies</h2>
        <AddMovie isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      <div className="border rounded-lg p-4">
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div key={movie.id} className="p-4 border rounded-lg my-2">
              <h3 className="text-xl font-bold">{movie.title}</h3>
              <p className="text-muted-foreground">{movie?.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
