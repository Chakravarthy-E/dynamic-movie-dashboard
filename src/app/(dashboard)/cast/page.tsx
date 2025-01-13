"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMovieStore } from "@/lib/store";
import { MovieCast } from "@/lib/types";

export default function CastPage() {
  const { toast } = useToast();
  const movies = useMovieStore((state) => state.movies);
  const addCastMember = useMovieStore((state) => state.addCastMember);

  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [castForm, setCastForm] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
  });

  const handleAddCast = () => {
    if (!castForm.name || !castForm.email || !selectedMovieId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newCast: MovieCast = {
      id: Math.random().toString(36).substr(2, 9),
      ...castForm,
      movieId: selectedMovieId,
    };

    addCastMember(selectedMovieId, newCast);
    setCastForm({ name: "", email: "", phone: "", place: "" });
    setIsOpen(false);
    toast({
      title: "Success",
      description: "Cast member added successfully!",
    });
  };

  const allCastMembers = movies.flatMap((movie) => movie.cast);

  const filteredCastMembers = selectedMovieId
    ? allCastMembers.filter((cast) => cast.movieId === selectedMovieId)
    : allCastMembers;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Manage Cast Members</h2>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Cast Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Cast Member</DialogTitle>
              <DialogDescription>
                Fill in the details of the new cast member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Select
                value={selectedMovieId}
                onValueChange={setSelectedMovieId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Movie" />
                </SelectTrigger>
                <SelectContent>
                  {movies.map((movie) => (
                    <SelectItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Name"
                value={castForm.name}
                onChange={(e) =>
                  setCastForm({ ...castForm, name: e.target.value })
                }
              />
              <Input
                type="email"
                placeholder="Email"
                value={castForm.email}
                onChange={(e) =>
                  setCastForm({ ...castForm, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone"
                value={castForm.phone}
                onChange={(e) =>
                  setCastForm({ ...castForm, phone: e.target.value })
                }
              />
              <Input
                placeholder="Place"
                value={castForm.place}
                onChange={(e) =>
                  setCastForm({ ...castForm, place: e.target.value })
                }
              />

              <Button onClick={handleAddCast} className="w-full">
                Add Cast Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movie</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Place</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCastMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No cast members found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCastMembers.map((cast) => (
                <TableRow key={cast.id}>
                  <TableCell>
                    {movies.find((movie) => movie.id === cast.movieId)?.title ||
                      "Unknown"}
                  </TableCell>
                  <TableCell>{cast.name}</TableCell>
                  <TableCell>{cast.email}</TableCell>
                  <TableCell>{cast.phone}</TableCell>
                  <TableCell>{cast.place}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
