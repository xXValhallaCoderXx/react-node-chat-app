import { RoomEntity } from 'chat-server/src/room';

describe("the creation of room entity", () => {
  it("should throw error if name is incorrect", async () => {
    const roomOrError = await RoomEntity.create("");
    expect(roomOrError.error).toEqual("Name is invalid");
  })

  it("should create a room", async () => {
    const name = "Asgard";
    const roomOrError = await RoomEntity.create(name);
    expect(roomOrError.getValue().name).toEqual(name);
    expect(roomOrError.getValue().members).toEqual([]);
    expect(roomOrError.getValue()).toHaveProperty("uid");
  })
})