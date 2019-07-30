import { Router } from 'express';
import Create from './controller-create';
import AllRooms from './controller-all-rooms';
import JoinRoom from './controller-join';
import RoomInfo from './controller-room-info';

export default class AuthController {
  path = '/api/room';
  router = Router();

  public constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { path } = this;
    this.router.get(`${path}`, (req, res) => new AllRooms().execute(req, res));
    this.router.post(`${path}/create`, (req, res) => new Create().execute(req, res));
    this.router.post(`${path}/join/:uid`, (req, res) => new JoinRoom().execute(req, res));
    this.router.get(`${path}/:uid`, (req, res) => new RoomInfo().execute(req, res));
  }
}
