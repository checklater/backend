import { DateTime } from "luxon";
import { z } from 'zod'

import { BaseTimeManager } from "./manager";

export class GenericTimeManager extends BaseTimeManager {

  nextBestTime(time: string): Date {
    const validated = z.string().datetime({ offset: true }).parse(time);

    const datetime = DateTime.fromISO(validated);
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
