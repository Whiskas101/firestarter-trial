
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { ReviewModel } from '@/models/ReviewModel';

interface ReviewContextType {
    review: ReviewModel[] | null;
    setReviewData: (data: ReviewModel[]) => void;
}

type ReviewProviderProps = {
    children: ReactNode
}

export const ReviewContext = createContext<ReviewContextType|undefined>(undefined);


export const ReviewProvider: React.FC<ReviewProviderProps> = ({children})=>{
    const [review, setReviewData] = useState<ReviewModel[]>([]);

    return(
        <ReviewContext.Provider value={{review, setReviewData}}>
            {children}
        </ReviewContext.Provider>
    )
}


export const useReviewContext = (): ReviewContextType => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within a ReviewProvider');
  }
  return context;
};




