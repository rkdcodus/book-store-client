import { useLocation } from "react-router-dom";
import { fetchBooks, FetchBooksResponse } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "@tanstack/react-query";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery({
    queryKey: ["books", location.search],
    queryFn: (): Promise<FetchBooksResponse> =>
      fetchBooks({
        category: params.get(QUERYSTRING.CATEGORY)
          ? Number(params.get(QUERYSTRING.CATEGORY))
          : undefined,
        news: params.get(QUERYSTRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1,
        limit: LIMIT,
      }),
  });

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
