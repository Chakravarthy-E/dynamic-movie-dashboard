"use client";

import { useAuthStore, useMovieStore } from "@/lib/store";
import MovieStatsCards from "@/components/global/movie-stats-cards";
import ChartDistribution from "@/components/global/chart-distribution";

export interface MovieStats {
  title: string;
  castCount: number;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const movies = useMovieStore((state) => state.movies);

  const totalMovies = movies.length;
  const totalCastMembers = movies.reduce(
    (acc, movie) => acc + movie.cast.length,
    0
  );
  const averageCastSize =
    totalMovies > 0 ? (totalCastMembers / totalMovies).toFixed(2) : "0";
  const activeProjects = movies.filter((movie) => movie.cast.length > 0).length;

  const movieStats: MovieStats[] = movies.map((movie) => ({
    title: movie.title,
    castCount: movie.cast.length,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your movie management dashboard
        </p>
      </div>

      <MovieStatsCards
        activeProjects={activeProjects}
        averageCastSize={averageCastSize}
        totalCastMembers={totalCastMembers}
        totalMovies={totalMovies}
      />

      <ChartDistribution movieStats={movieStats} />
    </div>
  );
}
