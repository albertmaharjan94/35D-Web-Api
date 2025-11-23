import { Request, Response } from 'express';
import { Book } from '../types/book.type';
import { CreateBookDTO } from '../dtos/book.dto';
import { BookService } from '../services/book.service';
// Zod schema has many functions like pick, omit, partial, etc.

// Comment after using Zod
// export type Book = {
//     id: string;
//     title: string;
//     date?: string;
// };
let bookService: BookService = new BookService();

export class BookController {
    createBooks = (req: Request, res: Response) => {
        try {
            const validation = CreateBookDTO.safeParse(req.body);
            if (!validation.success) {
                return res.status(400).json({ errors: validation.error });
            }
            const { id, title } = validation.data;
            const newBook: Book = bookService.createBook({ id, title });
            return res.status(201).json(newBook);
        } catch (error: Error | any) {
            return res.status(400).send(error.message ?? 'Something went wrong');
        }

    };

    getBooks = (req: Request, res: Response) => {
        const return_book: Book[] = bookService.getAllBooks();
        return res.status(200).json(return_book);
    }
}