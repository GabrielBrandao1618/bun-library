export class Book {
  id: string;
  title: string;
  authorId: string;
  numPages: number;
  constructor(id: string, title: string, authorId: string, numPages: number) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.numPages = numPages;
  }
}
