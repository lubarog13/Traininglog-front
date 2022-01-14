import { SignUp, SimplePresence, User, Workout } from "./models";

export interface WorkoutResponse {
  Workouts: Workout[]
}

export interface SimplePresenceResponse {
  Presences: SimplePresence[]
}

export interface SignUpResponse {
  Sign_Ups: SignUp[]
}

export interface UserResponse {
  Users: User[]
}