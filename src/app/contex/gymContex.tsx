"use client";
import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { Exercise } from "../../type";

const STORAGE_KEY = "fitlog:gym-state:v1";
const DAILY_PLAN_LIMIT = 5;

type AddResult = "added" | "already-added" | "limit-reached";
type SaveResult = "saved" | "already-saved";
type GymState = {
  todayPlan: Exercise[];
  savedList: Exercise[];
  doneIds: number[];
};

const EMPTY_STATE: GymState = { todayPlan: [], savedList: [], doneIds: [] };
const listeners = new Set<() => void>();
let currentState = EMPTY_STATE;
let hasLoadedStorage = false;

function readStoredState(): GymState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return EMPTY_STATE;
    const state = JSON.parse(stored) as Partial<GymState>;
    return {
      todayPlan: Array.isArray(state.todayPlan) ? state.todayPlan.slice(0, DAILY_PLAN_LIMIT) : [],
      savedList: Array.isArray(state.savedList) ? state.savedList : [],
      doneIds: Array.isArray(state.doneIds) ? state.doneIds : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function getClientSnapshot() {
  if (typeof window === "undefined") return EMPTY_STATE;
  if (!hasLoadedStorage) {
    currentState = readStoredState();
    hasLoadedStorage = true;
  }
  return currentState;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    hasLoadedStorage = false;
    getClientSnapshot();
    listeners.forEach((notify) => notify());
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function commitState(update: (state: GymState) => GymState) {
  currentState = update(getClientSnapshot());
  hasLoadedStorage = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  } catch {
    // Keep the current session usable when browser storage is unavailable.
  }
  listeners.forEach((notify) => notify());
}

type GymContextType = {
  todayPlan: Exercise[];
  savedList: Exercise[];
  doneIds: number[];
  markAsDone: (id: number) => void;
  removeFromToday: (id: number) => void;
  removeFromSaved: (id: number) => void;
  addToToday: (item: Exercise) => AddResult;
  saveForLater: (item: Exercise) => SaveResult;
};

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getClientSnapshot, () => EMPTY_STATE);

  const markAsDone = (id: number) => {
    commitState((current) => ({
      ...current,
      doneIds: current.doneIds.includes(id) ? current.doneIds : [...current.doneIds, id],
    }));
  };

  const removeFromToday = (id: number) => {
    commitState((current) => ({
      ...current,
      todayPlan: current.todayPlan.filter((exercise) => exercise.id !== id),
      doneIds: current.doneIds.filter((doneId) => doneId !== id),
    }));
  };

  const removeFromSaved = (id: number) => {
    commitState((current) => ({
      ...current,
      savedList: current.savedList.filter((exercise) => exercise.id !== id),
    }));
  };

  const addToToday = (item: Exercise) => {
    const current = getClientSnapshot();
    if (current.todayPlan.some((exercise) => exercise.id === item.id)) return "already-added";
    if (current.todayPlan.length >= DAILY_PLAN_LIMIT) return "limit-reached";
    commitState((next) => ({ ...next, todayPlan: [...next.todayPlan, item] }));
    return "added";
  };

  const saveForLater = (item: Exercise) => {
    const current = getClientSnapshot();
    if (current.savedList.some((exercise) => exercise.id === item.id)) return "already-saved";
    commitState((next) => ({ ...next, savedList: [...next.savedList, item] }));
    return "saved";
  };

  return (
    <GymContext.Provider
      value={{
        ...state,
        markAsDone,
        removeFromToday,
        removeFromSaved,
        addToToday,
        saveForLater,
      }}
    >
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