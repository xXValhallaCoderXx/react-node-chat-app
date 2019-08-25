import express, { Application } from 'express';
import loaders from './loaders';
import bodyParser from 'body-parser';
import { join } from 'path';
import cors from 'cors';

const cwd = process.cwd();
const directoryPath = join(cwd, './dist');

class App {
  public app: Application;
  constructor(controllers: any) {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeControllers(controllers || []);
    this.initalizeLoaders();
    this.initailizeStaticLoaders();
  }

  public getServer() {
    return this.app;
  }

  public listen(server?: any) {
    const app = server || this.app;
    app.listen(process.env.PORT, () => {
      console.log(`
    #########################################
    Server listening on port: ${process.env.PORT}
    #########################################
  `);
    });
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  private async initalizeLoaders() {
    await loaders();
  }

  private initailizeStaticLoaders() {
    this.app.use(express.static(directoryPath));
    this.app.get('*', (req, res) => {
      res.sendFile(join(directoryPath, 'index.html'));
    });
  }
}

export default App;
