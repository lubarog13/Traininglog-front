import { Club, Coach, Message, SignUp, SimplePresence, User, Workout } from "./models";

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

export interface MessageResponse {
  Messages: Message[]
}


export interface CoachResponse {
  Coach: Coach
}

export interface ClubsResponse {
  Clubs: Club[]
}