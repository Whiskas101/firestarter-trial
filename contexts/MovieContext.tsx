import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Movie } from '@/models/MovieModel';

interface MovieContextType{
    movie: Movie | null,
    setMovieData: (data: Movie) => void;
}

export const MovieContext = createContext<MovieContextType | undefined>(undefined);

type MovieProviderProps = {
    children: ReactNode
}

export const MovieProvider: React.FC<MovieProviderProps> = ({children})=>{
    const [movie, setMovieData] = useState<Movie | null>(null);

    return(
        <MovieContext.Provider value={{movie, setMovieData}}>
            {children}
        </MovieContext.Provider>
    )
}


// Custom hook to consume context
export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};



