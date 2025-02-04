export interface Book {
  id: number;
  category_id: number;
  title: string;
  form: string;
  author: string;
  isbn: string;
  pages: number;
  summary: string;
  detail: string;
  contents: string;
  price: number;
  pub_date: string;
  img: number;
  category: string;
  likes: number;
}

export interface BookDetail extends Book {
  liked: boolean;
}
