"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";
import { useMovieStore } from "@/lib/store";
import { MovieCast } from "@/lib/types";

export default function MovieDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [castForm, setCastForm] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
  });

  const movie = useMovieStore((state) => state.getMovie(params.id as string));
  const addCastMember = useMovieStore((state) => state.addCastMember);
  const castMembers = useMovieStore((state) =>
    state.getCastMembers(params.id as string)
  );

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Movie not found</h2>
          <Button
            variant="link"
            onClick={() => router.push("/dashboard/movies")}
            className="mt-4"
          >
            Go back to movies
          </Button>
        </div>
      </div>
    );
  }

  const handleAddCast = () => {
    if (!castForm.name || !castForm.email) return;

    const newCast: MovieCast = {
      id: Math.random().toString(36).substr(2, 9),
      ...castForm,
      movieId: movie.id,
    };

    addCastMember(movie.id, newCast);
    setCastForm({ name: "", email: "", phone: "", place: "" });
    setIsOpen(false);
    toast({
      title: "Success",
      description: "Cast member added successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{movie.title}</h2>
          <p className="text-muted-foreground">Manage cast members</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Cast Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Cast Member</DialogTitle>
              <DialogDescription>
                Enter the details of the cast member.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-4">
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
              </div>
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Place</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {castMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No cast members found. Add your first cast member!
                </TableCell>
              </TableRow>
            ) : (
              castMembers.map((cast) => (
                <TableRow key={cast.id}>
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
