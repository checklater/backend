import { EventBus, Event, TimeManager } from './types';
import { Scheduler } from './scheduler';

export class ScheduleWorker {
  nextItem: Event | null;
  private scheduler: Scheduler;
  private timeManager: TimeManager;
  private timeoutObject: any;
  private eventBus: EventBus;

  constructor(scheduler: Scheduler, timeManager: TimeManager, bus: EventBus) {
    this.nextItem = null;
    this.scheduler = scheduler;
    this.timeManager = timeManager;
    this.eventBus = bus;
  }

  private async _checkNext() {
    const next = await this.scheduler.next();
    if (!next) {
      return
    }

    if (!this.nextItem) {
      this.nextItem = next
      const sleepTime = this.timeManager.secondsUntil(
        this.nextItem.scheduled_time,
      );
      this.sleep(sleepTime * 1000);
      return
    }

    if (
      new Date(this.nextItem.scheduled_time) <= new Date(next.scheduled_time)
    ) {
      const sleepTime = this.timeManager.secondsUntil(
        this.nextItem.scheduled_time,
      );
      this.sleep(sleepTime * 1000);
    } else {
      const sleepTime = this.timeManager.secondsUntil(next.scheduled_time);
      this.nextItem = next;
      this.sleep(sleepTime * 1000);
    }
  }

  private sleep(until: number) {
    this.timeoutObject = setTimeout(this.emitReminder, until);
  }

  private emitReminder() {
    this.eventBus.emit('sendReminder', this.nextItem);
    this.nextItem = null
    this.checkNext()
  }

  private cancelTimer() {
    if (this.timeoutObject) {
      clearTimeout(this.timeoutObject);
    }
  }

  /**
   * Cancel set object timer and restart the process of checking if an item has been added.
   */
  checkNext() {
    this.cancelTimer();
    this._checkNext();
  }

  start() {
    this.scheduler.addListener('schedule:new', this.checkNext);
    this.checkNext();
  }
}
