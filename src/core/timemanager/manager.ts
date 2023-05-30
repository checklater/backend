import { z } from 'zod'
import { DateTime } from "luxon";
import { differenceInMinutes, differenceInSeconds } from 'date-fns';

type Time = string;

export class TimeManager {

  /**
   * minutes until specified time
   */
  secondsUntil(time: Time): number {
    z.string().datetime().parse(time)
    return differenceInSeconds(new Date(time), new Date())
  }

  /**
   * Minutes until specified time
   */
  minutesUntil(time: Time): number {
    z.string().datetime().parse(time)
    return differenceInMinutes(new Date(time), new Date())
  }


  /**
  * Given a Date instance or a valid date string, calculate and return the optimal
  * the next best optimal time to schedule notification for an item based on generic timing calculation.
  * If It's already past time to send notification for the day then it'll be sent the following day.
  *
  */
  nextBestTime(time: Time): Date {
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
