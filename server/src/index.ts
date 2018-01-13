import * as express from 'express';
import { createServer } from 'http';
import { createBidServer } from './ws';
import { api } from './rest';

const app = express();
app.use('/api', api);

const server = createServer(app);
createBidServer(server);
server.listen(9090);
