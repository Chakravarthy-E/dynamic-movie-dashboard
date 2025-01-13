"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useAuthStore, useMovieStore } from "@/lib/store";

interface IAddMovie {
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

function AddMovie({ isOpen, setIsOpen }: IAddMovie) {
  const addMovie = useMovieStore((state) => state.addMovie);
  const user = useAuthStore((state) => state.user);
  const [movieForm, setMovieForm] = useState({
    title: "",
    description: "",
  });

  const handleAddMovie = () => {
    if (!movieForm.title || !movieForm.description) {
      toast.error("Both title and description are required.");
      return;
    }

    const newMovie = {
      id: Math.random().toString(36).substr(2, 9),
      ...movieForm,
      cast: [],
      userId: user?.id ?? "",
    };

    addMovie(newMovie);
    setMovieForm({ title: "", description: "" });
    setIsOpen(false);
    toast.success("Movie added successfully!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Movie</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Movie</DialogTitle>
          <DialogDescription>
            Enter the details of the movie you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Title"
            value={movieForm.title}
            onChange={(e) =>
              setMovieForm({ ...movieForm, title: e.target.value })
            }
          />
          <Input
            placeholder="Description"
            value={movieForm.description}
            onChange={(e) =>
              setMovieForm({ ...movieForm, description: e.target.value })
            }
          />
          <Button onClick={handleAddMovie} className="w-full">
            Add Movie
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddMovie;
