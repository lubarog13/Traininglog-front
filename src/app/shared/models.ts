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
