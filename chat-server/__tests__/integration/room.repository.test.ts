import uuidv4 from 'uuid/v4';
import 'chat-server/config';
import { UserModel } from 'chat-server/src/user';
import { Repository as RoomRepo, RoomModel } from 'chat-server/src/room';
import App from 'chat-server/express-server';

beforeEach(async () => {
  await RoomModel.deleteMany('');
  await UserModel.deleteMany('');
});

afterAll(async () => {
  await RoomModel.deleteMany('');
})

describe("Fetch room info", () => {
  new App([]);
  const repo = new RoomRepo(RoomModel);
  it("should handle if invalid UID is provided", async () => {
    const roomOrError = await repo.fetchRoomInfo("");
    expect(roomOrError.error).toEqual("No room found");
  })
  it("should fetch room with valid UID", async () => {
    const uid = uuidv4();
    await new RoomModel({ name: 'Asgard', uid }).save();
    const roomOrError = await repo.fetchRoomInfo(uid);
    expect(roomOrError.getValue().name).toEqual("Asgard");
    expect(roomOrError.getValue().members).toHaveLength(0);
    expect(roomOrError.getValue().uid).toEqual(uid);
  })
})

describe("Add user to room", () => {
  new App([]);
  const repo = new RoomRepo(RoomModel);

  it("should handle missing user and room uid", async () => {
    const roomOrError = await repo.addUserToRoom("", "");
    expect(roomOrError.error).toEqual("Error adding user to room");
  })
  it("should handle if room exists but user is invalid", async () => {
    const uid = uuidv4();
    await new RoomModel({ name: 'Asgard', uid }).save();
    const roomOrError = await repo.addUserToRoom("", uid);
    expect(roomOrError.error).toEqual("Error adding user to room");
  })
  it("should add a user to the room", async () => {
    const uid = uuidv4();
    const userUid = uuidv4();
    await new RoomModel({ name: 'Asgard', uid }).save();
    const user = await new UserModel({
      username: 'Ivar',
      email: 'nate@gmail.com',
      password: '123456',
      uid: userUid,
      online: true,
    }).save();
    const roomOrError = await repo.addUserToRoom(user, uid);
    expect(roomOrError.getValue().members).toHaveLength(1);
    expect(roomOrError.getValue()).toMatchObject({
      name: "Asgard",
      uid,
    });
  })
})
