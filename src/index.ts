import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { PORT } from './configs';
import { connectDb } from './database/mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config(); 
// Can use .env variables after this
console.log(process.env.PORT);
// .env -> PORT=5050
import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import adminUserRoutes from './routes/admin/user.route';
import blogRoutes from './routes/blog.route';
import adminBlogRoutes from './routes/admin/blog.route';

const app: Application = express();
const corsOptions = {
    origin:[ 'http://localhost:3000', 'http://localhost:3003'], // Adjust this to your client's origin
};

app.use("/uploads", express.static(path.join(__dirname, '../uploads')));

app.use(cors(corsOptions));
// const port = 3000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', adminUserRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/blogs', blogRoutes);

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