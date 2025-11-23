import { Book } from "../types/book.type";

export const books: Book[] = [
    { id: "B-1", title: '1984' },
    { id: "B-2", title: 'To Kill a Mockingbird', date: "2022-10-10" }
];

export interface IBookRepository {
    getAllBooks(): Book[];
    createBook(book: Book): Book;
    getBookById?(id: string): Book | undefined;
}
export class BookRepository implements IBookRepository {
    createBook(book: Book): Book {
        books.push(book);
        return book;
    }
    getAllBooks(): Book[] {
        return books;
    }
    getBookById(id: string): Book | undefined {
        return books.find(book => book.id === id);
    }
}
// export class PostgresBookRepository implements IBookRepository {
//     createBook(book: Book): Book {
//         // sql = "insert into books ..."
//     }
//     getAllBooks(): Book[] {
//         // sql = "select * from books ..."
//     }
// }
