import { useEffect, useState } from "react";

const KEY = "5d49166";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // callback?.()
      // ブラウザのAPI
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // controller.abort()のよるエラーは無視する
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return function () {
        // 複数のリクエストが同時に発生した際、最後のリクエストを以外のリクエストをキャンセルする
        // 1. 新しいキー入力のたびに、コンポーネントが再レンダリングされる
        // 2. 新しい再レンダリングのたびに、コントローラは現在のfetchを中止する
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error }
}