export interface DBGateway {
  save(item: Event): Promise<Event>;
  findNext(): Promise<Event | null>;
  findWithId(id: string): Promise<Event | null>;
}

export type Item = {
  url: string;
  requested_on: string | Date;
};

export type Event = Item & {
  id: string;
  scheduled_time: string | Date;
};

type DateTime = string;

export interface TimeManager {
  /**
   * Give a time, return the next best time in a given day when a reminder should be sent to a user, factoring time offsets.
   * @param T - Time to derive the next best time from.
   * @returns {DateTime} - Next best time to shedule a reminder.
   */
  nextBestTime(T: DateTime): Date;

  /**
   * Given a time in the future, return number of minutes until time is reached.
   * @param {DateTime} T
   * @returns {number}
   */
  minutesUntil(T: DateTime): number;

  /**
   * Given a time in the future, return number of seconds until time is reached.
   * @param {DateTime} T
   * @returns {number}
   */
  secondsUntil(T: DateTime): number;
}

export interface EventBus {
  emit(eventName: string | symbol, ...args: any[]): boolean;
}
