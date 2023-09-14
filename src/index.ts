import Express from 'express';
import routes from './api';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();

const port = process.env.PORT;

app.use(bodyParser.json());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
