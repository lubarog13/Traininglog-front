import { SimplePresence, Workout } from "./models";

export interface WorkoutResponse {
  Workouts: Workout[]
}

export interface SimplePresenceResponse {
  Presences: SimplePresence[]
}