import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PORT } from './configs';
import { connectDb } from './database/mongodb';

import dotenv from 'dotenv';
dotenv.config(); 
// Can use .env variables after this
console.log(process.env.PORT);
// .env -> PORT=5050
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import adminUserRoutes from './routes/admin/user.route';

const app: Application = express();
// const port = 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

async function startServer(){
    await connectDb();

    app.listen(
        PORT, 
        () => {
            console.log(`Server: http://localhost:${PORT}`);
        }
    );
}

startServer();