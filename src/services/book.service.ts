import { IBookRepository, BookRepository } from "../repositories/book.repository";
import { Book } from "../types/book.type";
import { CreateBookDTO } from "../dtos/book.dto";
let bookRepository: IBookRepository = new BookRepository();
export class BookService {
    getAllBooks(): Book[] {
        let response: Book[] =
            bookRepository
                .getAllBooks()
                .map((book: Book) => {
                    return {
                        ...book,
                        title: book.title.toUpperCase()
                    };
                });
        return response;
    }
    createBook(bookDTO: CreateBookDTO): Book {
        const newBook: Book = {
            id: bookDTO.id,
            title: bookDTO.title
        };
        let existingBook = bookRepository.getBookById?.(newBook.id);
        if (existingBook) {
            throw new Error(`${newBook.id} already exists.`);
        }
        return bookRepository.createBook(newBook);
    }
}
