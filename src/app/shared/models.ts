export interface Building {
    id: number;
    name?: string;
    city: string;
    address: string;
    number: number;
    liter: string;
    lat?: number;
    lng?: number;    
}


export class User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    second_name?: string;
    email: string;
    date_birth: string;
    sex: string;
    password?: string;
    re_password?: string;
    is_coach?: boolean;

    constructor(username: string, password: string){
        this.username = username;
        this.password = password;
    }
}

export interface Message {
    id: number;
    heding: string;
    message?: string;
    send_time: string;
    sender: User,
    recipient: User
    send_date: Date
}

export interface SimpleMessage {
    id: number;
    heding: string;
    message?: string;
    send_time: string;
    sender?: number,
    recipient?: number
}

export class UserSearch {
    constructor(username: string) {
        this.username=username
    }
    username: string
}

export interface Coach {
    id: number;
    post: string;
    user: User;
}

export interface Hall {
    id: number;
    name: string;
    number?: number;
    building: Building;
    occupancy: number;
}

export interface Club {
    id: number;
    identifier: string;
    name: string;
    group: string;
    coach: Coach;
    building: Building
}


export interface Workout {
    id: number;
    start_time: string;
    end_time: string;
    type: string;
    other_type?: string;
    is_carried_out: boolean;
    coach_replace?: Coach;
    hall: Hall;
    club: Club;
    on_train?: number;
    dont_know?: number;
    not_on_train?: number;
    is_on?: boolean;
    start_date: Date;
    end_date: Date;
    color: string
}


export interface SignUp {
    id: number;
    club: Club;
    user: User;
    start_date: string;
    end_date: string;
    start_time: Date;
    end_time: Date;
}

export class Presence {
    id: number;
    user: User;
    workout: Workout;
    is_attend?: boolean;
    reason?: string;
    delay: boolean;
    early_ret: boolean;

    constructor(is_attend: boolean, reason: string) { this.is_attend=is_attend; this.reason=reason}
}

export interface SimplePresence {
    id: number;
    user: User;
    workout: number;
    is_attend?: boolean;
    reason?: string;
    delay: boolean;
    early_ret: boolean;
}

export class PresenceForCreate {
    id: number;
    user: number;
    workout: number;
    is_attend?: boolean;
    reason?: string;
    delay: boolean;
    early_ret: boolean;

    constructor(presence: Presence) {
        this.id = presence.id
        this.user = presence.user.id
        this.workout = presence.workout.id
        this.is_attend = presence.is_attend
        this.reason = presence.reason
        this.delay = presence.delay
        this.early_ret = presence.early_ret
    }
}

export interface TypesAnalysis {
    Cardio: number;
    Strength: number;
    For_tech: number;
    For_all: number;
    Another: number;
    club?: string
}

export interface MonthsAnalysis {
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
}

export class WorkoutForCreate {
    start_time: string;
    end_time: string;
    type: string;
    other_type?: string;
    is_carried_out: boolean;
    coach_replace?: number;
    hall: number;
    club: number;

    constructor(
        start_time: string,
        end_time: string,
        type: string,
        is_carried_out: boolean,
        hall: number,
        club: number,
        other_type?: string,
        coach_replace?: number
        ) {
            this.start_time = start_time
            this.end_time = end_time
            this.type = type
            this.other_type = other_type
            this.is_carried_out = is_carried_out
            this.coach_replace = coach_replace
            this.hall = hall
            this.club = club
        }
}

export interface GroupAnalysisItem {
    workout__club__id: number,
    workout__club__group: string,
    pcount: number,
    club__group: string,
    wcount: number
}

export interface GroupAnalysis {
    Stat: GroupAnalysisItem[]
}

export class Month {
    day: string
    constructor(day: string) { this.day = day}
}

export class ClubForCreate {
    name: string;
    group: string;
    coach: number;
    building: number

    constructor(name: string, group: string, coach: number, building: number) {
        this.name = name
        this.group = group
        this.coach = coach
        this.building = building
    }
}

export interface SignUpForCreate {
    club: number;
    user: number;
    start_date: string;
    end_date: string;
}