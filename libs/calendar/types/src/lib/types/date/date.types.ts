export interface Day {
  date: Date;
  number: number;
  isWeekend: boolean;
  isToday?: boolean;
  inDisabled?: boolean;
  isSelected?: boolean;
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
