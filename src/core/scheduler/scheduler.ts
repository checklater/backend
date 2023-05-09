import EventEmitter2 from "eventemitter2";
import { DBGateway, InputItem, OutputItem, TimeManager } from "./types";

export class Scheduler extends EventEmitter2 {
  private db: DBGateway;

  constructor(db: DBGateway) {
    super()
    this.db = db;
  }

  async schedule(item: InputItem, timeManager: TimeManager): Promise<void> {
    const reminderTime = timeManager.nextBestTime(item.requested_on);
    const itemId = await this.generateId()
    const outputItem: OutputItem = {
      id: itemId,
      scheduled_time: reminderTime,
      ...item

    }
    this.db.save(outputItem);
    this.emit("schedule:new")
  }
  async next(): Promise<OutputItem | null> {
    return this.db.findNext()
  }

  private async generateId(): Promise<string> {
    const id = "new id";
    if (await this.itemWithIdExist(id)) {
      return this.generateId()
    }
    return id
  }

  private async itemWithIdExist(id: string): Promise<boolean> {
    const item = await this.db.findWithId(id);
    return item !== null
  }
}
