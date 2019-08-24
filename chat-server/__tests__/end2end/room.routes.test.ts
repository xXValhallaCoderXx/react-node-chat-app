import request from 'supertest';
import uuidv4 from 'uuid/v4';
import 'chat-server/config';
import { UserModel } from 'chat-server/src/user';
import { RoomController, RoomModel } from 'chat-server/src/room';
import App from 'chat-server/express-server';

beforeEach(async () => {
  await RoomModel.deleteMany('');
  await UserModel.deleteMany('');
});

const app = new App([new RoomController()]);

describe('Room: GET /api/room', () => {
  it('will return an empty array if no rooms', async () => {
    const response = await request(app.getServer())
      .get('/api/room')
      .set('Content-Type', 'application/json')
      .expect(200);
    expect(response.body).toMatchObject([]);
  });
});

describe('Room: GET /api/room/:uid', () => {
  it('will return a 404 if room UID not found', async () => {
    await request(app.getServer())
      .get('/api/room/123')
      .set('Content-Type', 'application/json')
      .expect(404);
  });

  it('will a return a room', async () => {
    const roomUid = uuidv4();
    await new RoomModel({ name: 'Asgard', uid: roomUid }).save();
    const response = await request(app.getServer())
      .get(`/api/room/${roomUid}`)
      .set('Content-Type', 'application/json')
      .expect(200);
    expect(response.body).toMatchObject({ members: [], messages: [], name: 'Asgard', uid: roomUid });
  });
});

describe('Room: POST /api/room', () => {
  it('will create a new room', async () => {
    const response = await request(app.getServer())
      .post('/api/room')
      .send({ name: 'Asgard' })
      .set('Content-Type', 'application/json')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        members: expect.any(Array),
        uid: expect.any(String),
      }),
    );

    const { uid } = response.body;
    const checkRoom = await RoomModel.findOne({ uid });
    expect(checkRoom!.name).toMatch('Asgard');
  });

  it('will handle error if name is invalid', async () => {
    const response = await request(app.getServer())
      .post('/api/room')
      .send({ name: '' })
      .set('Content-Type', 'application/json')
      .expect(500);

    expect(response.body).toMatchObject({ message: 'Name is invalid' });
  });
});

describe('Room: POST /api/room/join/:uid', () => {
  it('will return error if user UID is missing', async () => {
    const uid = uuidv4();
    const response = await request(app.getServer())
      .post(`/api/room/join/${uid}`)
      .set('Content-Type', 'application/json')
      .expect(500);
    expect(response.body).toMatchObject({ message: 'User UID is missing' });
  });

  it('will return error if room uid is not found', async () => {
    const uid = uuidv4();
    const response = await request(app.getServer())
      .post(`/api/room/join/${uid}`)
      .send({ userUid: '1234' })
      .set('Content-Type', 'application/json')
      .expect(500);
    expect(response.body).toMatchObject({ message: 'Room not found' });
  });

  it('will return error if user uid is not found', async () => {
    const uid = uuidv4();
    await new RoomModel({ name: 'Asgard', uid }).save();
    const response = await request(app.getServer())
      .post(`/api/room/join/${uid}`)
      .send({ userUid: '1234' })
      .set('Content-Type', 'application/json')
      .expect(500);
    expect(response.body).toMatchObject({ message: 'User not found' });
  });

  it('will add user to room', async () => {
    const uid = uuidv4();
    const userUid = uuidv4();
    await new RoomModel({ name: 'Asgard2', uid }).save();
    await new UserModel({
      username: 'Ivar',
      email: 'nate@gmail.com',
      password: '123456',
      uid: userUid,
      online: true,
    }).save();
    const response = await request(app.getServer())
      .post(`/api/room/join/${uid}`)
      .send({ userUid })
      .set('Content-Type', 'application/json')
      .expect(200);
    expect(response.body.name).toEqual("Asgard2");
    expect(response.body.members).toHaveLength(1);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        members: expect.any(Array),
        uid: expect.any(String),
      }),
    );
  });
});
