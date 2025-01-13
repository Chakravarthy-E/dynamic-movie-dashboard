"use client";

import { useState } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof MovieCast | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterPlace, setFilterPlace] = useState<string>("");

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

  // Filter by search query and place
  const filteredCastMembers = allCastMembers
    .filter((cast) =>
      searchQuery
        ? cast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cast.email.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((cast) => (filterPlace ? cast.place === filterPlace : true));

  // Sort cast members
  const sortedCastMembers = sortKey
    ? [...filteredCastMembers].sort((a, b) => {
        const compare =
          a[sortKey]?.toString().localeCompare(b[sortKey]?.toString() || "") ||
          0;
        return sortOrder === "asc" ? compare : -compare;
      })
    : filteredCastMembers;

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3"
        />

        <Select value={filterPlace} onValueChange={setFilterPlace}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by place" />
          </SelectTrigger>
          <SelectContent>
            {[...new Set(allCastMembers.map((cast) => cast.place))].map(
              (place) => (
                <SelectItem key={place} value={place}>
                  {place}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() =>
                  setSortKey("movieId") ||
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              >
                Movie
                {sortKey === "movieId" &&
                  (sortOrder === "asc" ? (
                    <ChevronUp className="inline" />
                  ) : (
                    <ChevronDown className="inline" />
                  ))}
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Place</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCastMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No cast members found.
                </TableCell>
              </TableRow>
            ) : (
              sortedCastMembers.map((cast) => (
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
