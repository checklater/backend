import { GenericTimeManager } from "../generic.manager"

describe("Time manager", () => {

  const manager = new GenericTimeManager()

  it("Return new day if night", () => {
    const date = '2023-06-01T23:00:00+01:00'
    expect(manager.nextBestTime(date)).toEqual(new Date('2023-06-02T05:00:00Z'))
  })

  it("Return time in afternoon if requested after morning", () => {
    const date = '2023-06-01T08:30:00+01:00'
    expect(manager.nextBestTime(date)).toEqual(new Date('2023-06-01T13:00:00Z'))
  })

})
