export interface Meeting {
  start: Date;
  end: Date;
  name: string;
  meetingRoom: string;
  participants: string[];
  conflictMeetingIds?: number[];
}
