import { z } from 'zod'
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

export abstract class BaseTimeManager {

  /**
   * Seconds until specified time
   */
  secondsUntil(date: Date): number {
    const validated = z.string().datetime().parse(date)
    return differenceInSeconds(new Date(validated), new Date())
  }

  /**
   * Minutes until specified time
   */
  minutesUntil(date: Date): number {
    const validated = z.string().datetime().parse(date)
    return differenceInMinutes(new Date(validated), new Date())
  }


  /**
  * Given a Date instance or a valid date string, calculate and return the optimal
  * the next best optimal time to schedule notification for an item based on generic timing calculation.
  * If It's already past time to send notification for the day then it'll be sent the following day.
  * Factors timezone if offsets is included in time string.
  *
  * @param {string} time Datetime string of relative time from where next best time should be calculated.
  *
  * @returns {Date} Next best time to send notification
  *
  */
  abstract nextBestTime(time: string): Date

}
