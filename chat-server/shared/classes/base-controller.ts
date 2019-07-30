import express from 'express';

export default abstract class BaseController {
  // or even private
  protected req: express.Request;
  protected res: express.Response;

  protected abstract executeImpl(): Promise<void | any>;

  public execute(req: express.Request, res: express.Response): void {
    this.req = req;
    this.res = res;

    this.executeImpl();
  }

  protected jsonResponse(code: number, message: string) {
    return this.res.status(code).json({ message });
  }

  protected ok<T>(dto?: T) {
    if (!!dto) {
      return this.res.status(200).json(dto);
    } else {
      return this.res.sendStatus(200);
    }
  }

  protected created() {
    return this.res.sendStatus(201);
  }

  protected clientError(message?: string) {
    return this.jsonResponse(400, message ? message : 'Unauthorized');
  }

  protected unauthorized(message?: string) {
    return this.jsonResponse(401, message ? message : 'Unauthorized');
  }

  protected forbidden(message?: string) {
    return this.jsonResponse(403, message ? message : 'Forbidden');
  }

  protected notFound(message?: string) {
    return this.jsonResponse(404, message ? message : 'Not found');
  }

  protected fail(error: Error | string) {
    return this.res.status(500).json({
      message: error.toString(),
    });
  }
}
