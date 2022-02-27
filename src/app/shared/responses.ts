import { Club, Coach, FCMDevice, Message, Presence, SignUp, SimplePresence, User, Workout } from "./models";

export interface WorkoutResponse {
  Workouts: Workout[]
}

export interface SimplePresenceResponse {
  Presences: SimplePresence[]
}

export interface PresencesResponse {
  Presences: Presence[]
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

export interface DeviceResponse {
  Devices: FCMDevice[]
}