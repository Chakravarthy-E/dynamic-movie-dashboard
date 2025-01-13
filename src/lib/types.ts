export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export interface MovieCast {
  id: string;
  name: string;
  email: string;
  phone: string;
  place: string;
  movieId: string;
}

export interface Movie {
  description: string;
  id: string;
  title: string;
  userId: string;
  cast: MovieCast[];
}
