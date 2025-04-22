# PTNK Library - Backend

Tech stack 
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

## Yêu cầu và hướng dẫn cài đặt:
- [NodeJS 22 (LTS)](https://nodejs.org/en)
- [Yarn 4.9.x (stable)](https://yarnpkg.com/getting-started/install)
- [Docker Desktop](https://docs.docker.com/desktop/)

## Project setup

```bash
git clone https://github.com/bmin-mit/PTNK-Library-BE

cd PTNK-Library-BE
yarn
```

## Docker

### Setup PostgreSQL cho lần đầu sử dụng

```bash
docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password postgres
docker exec -it postgres bash
psql -U postgres # Nhập password là `password`
```

Trong prompt của `psql` tạo database cho ứng dụng:

```postgresql
CREATE DATABASE "ptnk-library";
```

Ở những lần tiếp theo, chỉ cần khởi chạy container `postgres` đã tạo thông qua Docker Desktop

## Build và run production

```bash
yarn build
yarn run start:prod
```

Server sẽ được khởi chạy ở http://localhost:5001

Tài khoản mặc định của admin là:
- Email: `admin@system.com`
- Password: `password`

## Documentation

- Swagger API Reference: [http://localhost:5001/swagger](http://localhost:5001/swagger)

## Optional seeding data
Nếu cần một bảng data mẫu cho các đầu sách, có thể chạy lệnh sau:

```PostgreSQL
INSERT INTO book (name, author, quantity, stock, position, publisher, "publishYear", isbn, language)
VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 5, 3, 'Shelf A1', 'Charles Scribner''s Sons', 1925, '9780743273565', 'English'),
    ('To Kill a Mockingbird', 'Harper Lee', 4, 2, 'Shelf A2', 'J.B. Lippincott & Co.', 1960, '9780061120084', 'English'),
    ('1984', 'George Orwell', 6, 4, 'Shelf A3', 'Secker & Warburg', 1949, '9780451524935', 'English'),
    ('Pride and Prejudice', 'Jane Austen', 3, 1, 'Shelf B1', 'T. Egerton', 1813, '9780141439518', 'English'),
    ('The Catcher in the Rye', 'J.D. Salinger', 5, 3, 'Shelf B2', 'Little, Brown and Company', 1951, '9780316769488', 'English'),
    ('The Hobbit', 'J.R.R. Tolkien', 7, 5, 'Shelf B3', 'George Allen & Unwin', 1937, '9780547928227', 'English'),
    ('Fahrenheit 451', 'Ray Bradbury', 4, 2, 'Shelf C1', 'Ballantine Books', 1953, '9781451673319', 'English'),
    ('Jane Eyre', 'Charlotte Brontë', 3, 2, 'Shelf C2', 'Smith, Elder & Co.', 1847, '9780141441146', 'English'),
    ('Brave New World', 'Aldous Huxley', 6, 4, 'Shelf C3', 'Chatto & Windus', 1932, '9780060850524', 'English'),
    ('The Lord of the Rings', 'J.R.R. Tolkien', 8, 6, 'Shelf D1', 'George Allen & Unwin', 1954, '9780618640157', 'English'),
    ('Animal Farm', 'George Orwell', 5, 3, 'Shelf D2', 'Secker & Warburg', 1945, '9780451526342', 'English'),
    ('Wuthering Heights', 'Emily Brontë', 4, 2, 'Shelf D3', 'Thomas Cautley Newby', 1847, '9780141439556', 'English'),
    ('The Odyssey', 'Homer', 6, 4, 'Shelf E1', 'Penguin Classics', -800, '9780140268867', 'English'),
    ('Moby-Dick', 'Herman Melville', 3, 1, 'Shelf E2', 'Harper & Brothers', 1851, '9780142437247', 'English'),
    ('Crime and Punishment', 'Fyodor Dostoevsky', 5, 3, 'Shelf E3', 'The Russian Messenger', 1866, '9780140449136', 'English'),
    ('The Brothers Karamazov', 'Fyodor Dostoevsky', 4, 2, 'Shelf F1', 'The Russian Messenger', 1880, '9780374528379', 'English'),
    ('War and Peace', 'Leo Tolstoy', 6, 4, 'Shelf F2', 'The Russian Messenger', 1869, '9780199232765', 'English'),
    ('Great Expectations', 'Charles Dickens', 5, 3, 'Shelf F3', 'Chapman & Hall', 1861, '9780141439563', 'English'),
    ('Little Women', 'Louisa May Alcott', 4, 2, 'Shelf G1', 'Roberts Brothers', 1868, '9780142408766', 'English'),
    ('The Grapes of Wrath', 'John Steinbeck', 6, 4, 'Shelf G2', 'The Viking Press-James Lloyd', 1939, '9780143039433', 'English'),
    ('Ulysses', 'James Joyce', 3, 1, 'Shelf G3', 'Sylvia Beach', 1922, '9780199535675', 'English'),
    ('The Divine Comedy', 'Dante Alighieri', 5, 3, 'Shelf H1', 'John Murray', 1320, '9780140448955', 'English'),
    ('Les Misérables', 'Victor Hugo', 4, 2, 'Shelf H2', 'A. Lacroix, Verboeckhoven & Cie.', 1862, '9780451419439', 'English'),
    ('The Iliad', 'Homer', 6, 4, 'Shelf H3', 'Penguin Classics', -750, '9780140275360', 'English'),
    ('Don Quixote', 'Miguel de Cervantes', 5, 3, 'Shelf I1', 'Francisco de Robles', 1605, '9780060934347', 'English'),
    ('Madame Bovary', 'Gustave Flaubert', 4, 2, 'Shelf I2', 'Revue de Paris', 1856, '9780140449129', 'English'),
    ('The Count of Monte Cristo', 'Alexandre Dumas', 6, 4, 'Shelf I3', 'Penguin Classics', 1844, '9780140449266', 'English'),
    ('Dracula', 'Bram Stoker', 5, 3, 'Shelf J1', 'Archibald Constable and Company', 1897, '9780141439846', 'English'),
    ('Frankenstein', 'Mary Shelley', 4, 2, 'Shelf J2', 'Lackington, Hughes, Harding, Mavor & Jones', 1818, '9780141439471', 'English'),
    ('The Picture of Dorian Gray', 'Oscar Wilde', 6, 4, 'Shelf J3', 'Ward, Lock & Company', 1890, '9780141439570', 'English'),
    ('A Tale of Two Cities', 'Charles Dickens', 5, 3, 'Shelf K1', 'Chapman & Hall', 1859, '9780141439600', 'English'),
    ('The Scarlet Letter', 'Nathaniel Hawthorne', 4, 2, 'Shelf K2', 'Ticknor, Reed & Fields', 1850, '9780142437261', 'English'),
    ('Heart of Darkness', 'Joseph Conrad', 6, 4, 'Shelf K3', 'Blackwood''s Magazine', 1899, '978014144167', 'English');
```