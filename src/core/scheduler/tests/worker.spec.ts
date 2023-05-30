import { mockDeep } from "jest-mock-extended"
import { Scheduler } from "../scheduler"
import { SchedulerFactory } from "../scheduler.factory"
import { EventBus, TimeManager } from "../types"

describe("Schedule worker test", () => {
  const scheduler = mockDeep<Scheduler>()
  const timeManager = mockDeep<TimeManager>()
  const event = mockDeep<EventBus>()
  const worker = SchedulerFactory.initWorker(scheduler, timeManager, event)

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it("Should start worker", () => {
    jest.spyOn(worker, 'checkNext')
    worker.start()
    expect(scheduler.addListener).toHaveBeenCalled()
    expect(worker.checkNext).toHaveBeenCalled()
  })
})
