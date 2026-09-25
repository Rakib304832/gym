"use client";
import {createContext, useContext, useState, ReactNode} from 'react';
import {Exercise} from "../../type";

type GymContextType = {
    todayPlan: Exercise[]
    savedList: Exercise[]
    addToToday: (item: Exercise) => void;
    saveForLater: (item: Exercise ) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);


export function GymProvider({ children }: {children: ReactNode}){
    const [todayPlan, setTodayPlan] = useState<Exercise[]>([])
    const [savedList, setSavedList] = useState<Exercise[]>([])
    const addToToday = (item: Exercise) => {
        setTodayPlan((prev) =>
        prev.find((e) => e.id === item.id) ? prev : [...prev, item]
        )
    }
      const saveForLater = (item: Exercise) => {
        setSavedList((prev) =>
        prev.find((e) => e.id === item.id) ? prev : [...prev, item]
        )
    }
   return (
    <GymContext.Provider value={{ todayPlan, savedList, addToToday, saveForLater }}>
      {children}
    </GymContext.Provider>
  );
}
export function useGym() {
  const context = useContext(GymContext);
  if (!context) throw new Error("useGym must be used inside GymProvider");
  return context;
}


export default GymProvider;