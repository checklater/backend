import { z } from 'zod'
import { DateTime } from "luxon";
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

export class TimeManager {

  /**
   * minutes until specified time
   */
  secondsUntil(date: Date): number {
    z.string().datetime().parse(date)
    return differenceInSeconds(new Date(date), new Date())
  }

  /**
   * Minutes until specified time
   */
  minutesUntil(date: Date): number {
    z.string().datetime().parse(date)
    return differenceInMinutes(new Date(date), new Date())
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
  nextBestTime(time: string): Date {
    z.string().datetime({ offset: true }).parse(time);

    const datetime = DateTime.fromISO(time);
    const hour = this.getBestHour(datetime.hour);
    const nextTime = datetime.set({ minute: 0, hour: hour, second: 0 })

    if (datetime.hour >= 21) {
      return nextTime.plus({ days: 1 }).toJSDate()
    }

    return nextTime.toJSDate()
  }

  private getBestHour(hour: number): number {
    const times = [6, 7, 8, 14, 15, 17, 18, 19, 20, 21, 22]

    for (let i = 0; i < times.length; i++) {
      if (times[i] - hour >= 2) {
        return times[i]
      }
    }

    return times[0]
  }

}
