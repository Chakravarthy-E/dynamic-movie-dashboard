import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IMovieStats {
  totalMovies: number;
  totalCastMembers: number;
  averageCastSize: string;
  activeProjects: number;
}

function MovieStatsCards({
  totalMovies,
  totalCastMembers,
  activeProjects,
  averageCastSize,
}: IMovieStats) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMovies}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Cast Members
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCastMembers}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Cast Size
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageCastSize}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeProjects}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MovieStatsCards;
