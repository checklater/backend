export interface DBGateway {
  save(item: Event): Promise<Event>;
  findNext(): Promise<Event | null>;
  findWithId(id: string): Promise<Event>;
}

export type Item = {
  url: string;
  requested_on: string;
};

export type Event = Item & {
  scheduled_time: Date;
};

export interface TimeManager {
  /**
   * Give a time, return the next best time in a given day when a reminder should be sent to a user, factoring time offsets.
   * @param T - Time to derive the next best time from.
   * @returns {DateTime} - Next best time to shedule a reminder.
   */
  nextBestTime(T: string): Date;

  /**
   * Given a time in the future, return number of minutes until time is reached.
   * @param T
   * @returns minutes until T
   */
  minutesUntil(T: Date): number;

  /**
   * Given a time in the future, return number of seconds until time is reached.
   * @param T
   * @returns seconds until T
   */
  secondsUntil(T: Date): number;
}

export interface EventBus {
  emit(eventName: string | symbol, ...args: any[]): boolean;
}
