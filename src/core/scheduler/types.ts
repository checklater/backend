export interface DBGateway {
  save(item: OutputItem): Promise<OutputItem>;
  findNext(): Promise<OutputItem | null>;
  findWithId(id: string): Promise<OutputItem | null>;
}

export type InputItem = {
  url: string;
  requested_on: string | Date
}

export type OutputItem = InputItem & {
  id: string;
  scheduled_time: string | Date
}

type Time = string | Date;

export interface TimeManager {
  /** 
    * Give a time, return the next best time in a given day when a reminder should be sent to a user, factoring time offsets.
    * @param T - Time to derive the next best time from.
    * @returns {Time} - Next best time to shedule a reminder.
    */
  nextBestTime(T: Time): Time;

  /**
    * Given a time in the future, return number of minutes until time is reached.
    * @param {Time} T
    * @returns {number}
    */
  minutesUntil(T: Time): number;

  /**
    * Given a time in the future, return number of seconds until time is reached.
    * @param {Time} T
    * @returns {number}
    */
  secondsUntil(T: Time): number;
}
