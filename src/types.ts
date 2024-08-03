export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface PreEventDetails {
    title: string;
    eventType: EventType;
    description: string;
    dateTime: string;
    speakerDetails: {
        name: string;
    }[];
    host: {
        name: string;
    };
}

export enum EventType {
   ONLINE,
   PHYSICAL,
   HYBRID
}
