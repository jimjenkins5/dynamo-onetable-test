import { APIGatewayRequestEvent, Application, NextCallback, Request, Response } from '@silvermine/lambda-express';
import { Callback, Context } from 'aws-lambda';
import usersRouter from './routes/users';
import utilRouter from './routes/util';


const app = new Application;

app.get('/ping', (req: Request, res: Response) => {
  return res.json({ success: true, message: 'pong', tableName: process.env.TABLE_NAME });
});
app.addSubRouter('/utils', utilRouter);
app.get('/:orgId/users', usersRouter.getAll);
app.get('/:orgId/users/:userId/detailed/', usersRouter.getDetailed);

app.use(
  (err: unknown, req: Request, resp: Response, next: NextCallback) => {
    resp.status(500).json({ message: 'error', error: err });
  },
);

export function handler(event: APIGatewayRequestEvent, context: Context, cb: Callback) {
  app.run(event, context, cb);
}
