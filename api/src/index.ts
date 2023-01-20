import dotenv from 'dotenv'
import { app } from './app'
import socketIOServer from './socketIOServer';

dotenv.config();

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})

socketIOServer(app, server)