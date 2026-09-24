export interface Exercise {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: number; // in minutes
  caloriesBurned: number;
  sets: number;
  reps: string; // e.g. "6-8", "30-45s", "10-12/leg"
  rating: number;
  description: string;
  instructions: string[];
}