import { OutputItem, TimeManager } from "./types";
import { Scheduler } from './scheduler'

export class ScheduleWorker {
  nextItem: OutputItem | null;
  scheduler: Scheduler
  timeManager: TimeManager

  constructor(scheduler: Scheduler, timeManager: TimeManager) {
    this.nextItem = null;
    this.scheduler = scheduler;
    this.timeManager = timeManager;
  }

  private async _checkNext() {
    const next: OutputItem = await this.scheduler.next();
    if (next == this.nextItem) {
      return
    }

  }

  async checkNext() {
    this._checkNext();
  }

}
