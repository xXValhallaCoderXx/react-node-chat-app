import { Router } from 'express';
import RegisterController from './controller-register';
import LoginController from './controller-login';

export default class AuthController {
  path = '/api/auth';
  router = Router();

  public constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { path } = this;
    this.router.post(`${path}/register`, (req, res) => new RegisterController().execute(req, res));
    this.router.post(`${path}/login`, (req, res) => new LoginController().execute(req, res));
  }
}
