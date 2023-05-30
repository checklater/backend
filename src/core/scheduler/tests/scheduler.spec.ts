import { mockDeep } from "jest-mock-extended"
import { SchedulerFactory } from "../scheduler.factory"
import { DBGateway, TimeManager } from "../types"

describe("Scheduler test", () => {
  const db = mockDeep<DBGateway>()
  const scheduler = SchedulerFactory.initScheduler(db);

  it("Should schedule an item", async () => {
    db.findWithId.mockResolvedValue(null);
    jest.spyOn(scheduler, "emit")
    const timeManager = mockDeep<TimeManager>();
    await scheduler.schedule(mockDeep(), timeManager);
    expect(timeManager.nextBestTime).toHaveBeenCalled();
    expect(db.save).toHaveBeenCalled();
    expect(scheduler.emit).toHaveBeenCalled();
  })

  it("Should get next item in queue", async () => {
    await scheduler.next()
    expect(db.findNext).toHaveBeenCalled()
  })
})
