import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, Movie, MovieCast } from "./types";

interface MovieState {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  addCastMember: (movieId: string, cast: MovieCast) => void;
  getMovie: (id: string) => Movie | undefined;
  getCastMembers: (movieId: string) => MovieCast[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = create<
  AuthState & {
    registeredUsers: { name: string; email: string; password: string }[];
    registerUser: (name: string, email: string, password: string) => void;
    login: (email: string, password: string) => boolean;
  }
>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      registeredUsers: [],

      setUser: (user) => set({ user }),

      setToken: (token) => set({ token }),

      logout: () => set({ user: null, token: null }),

      registerUser: (name, email, password) => {
        const users = get().registeredUsers;

        if (users.some((user) => user.email === email)) {
          console.warn("User with this email is already registered.");
          return;
        }

        set({
          registeredUsers: [...users, { name, email, password }],
        });

        set({
          user: { id: "new_user_id", name, email },
          token: "your_generated_token",
        });

        console.log("User registered successfully.");
      },

      login: (email, password) => {
        const users = get().registeredUsers;

        if (!users || users.length === 0) {
          console.warn("No registered users found.");
          return false;
        }

        const foundUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (foundUser) {
          set({
            user: { id: "user_id_placeholder", name: foundUser.name, email },
            token: "your_generated_token",
          });
          console.log("Login successful.");
          return true;
        } else {
          console.warn("Invalid credentials.");
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => ({ movies: [...state.movies, movie] })),
      addCastMember: (movieId, cast) =>
        set((state) => ({
          movies: state.movies.map((movie) =>
            movie.id === movieId
              ? { ...movie, cast: [...movie.cast, cast] }
              : movie
          ),
        })),
      getMovie: (id) => get().movies.find((movie) => movie.id === id),
      getCastMembers: (movieId) =>
        get().movies.find((movie) => movie.id === movieId)?.cast || [],
    }),
    {
      name: "movie-storage",
    }
  )
);
