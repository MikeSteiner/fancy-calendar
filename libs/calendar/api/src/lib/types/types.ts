export interface Day {
  date: Date;
  number: number;
  isWeekend: boolean;
  inDisabled?: boolean;
  isSelected?: boolean;
  isToday?: boolean;
}

export interface Week {
  number: number;
  days: Day[];
}

export interface Month {
  number: number;
  weeks: Week[];
}

/**
 * The value for each day of the week, based on the UTC locale
 *
 * @publicApi
 */
export enum WeekUTCDay {
  Monday = 0,
  Tuesday = 1,
  Wednesday = 2,
  Thursday = 3,
  Friday = 4,
  Saturday = 5,
  Sunday = 6,
}

// Meetings
export interface Meeting {
  start: Date;
  end: Date;
  name: string;
  meetingRoom: string;
  participants: string[];
}
