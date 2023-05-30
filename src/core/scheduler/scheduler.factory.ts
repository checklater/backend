import { Scheduler } from "./scheduler";
import { DBGateway, EventBus, TimeManager } from "./types";
import { ScheduleWorker } from "./worker";

export class SchedulerFactory {
  static initScheduler(db: DBGateway): Scheduler {
    return new Scheduler(db)
  }
  static initWorker(s: Scheduler, t: TimeManager, e: EventBus): ScheduleWorker {
    return new ScheduleWorker(s, t, e)
  }
}
