import { Application } from 'express';
import bodyParser from 'body-parser';

class App {
  public app: Application;

  public constructor(server: any, controllers?: any) {
    this.app = server;

    this.initializeMiddlewares();
    this.initializeControllers(controllers || []);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }
}

export default App;
