import { useState, useEffect } from "react"

const Key = "ea397b57"

export function useFetch(url, value) {

    const [dataMovies, SetdataMovies] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState()

    useEffect(function () {
        const controller = new AbortController()
        async function getData() {
            setError("")
            setLoading(true)
            try {
                const res = await fetch(`${url}${value}`, { signal: controller.signal });
                console.log(res);
                if (!res.ok) throw new Error("cant conecting server");
                const Data = await res.json();
                if (Data.Response === "False") throw new Error("not fund movies")
                console.log(Data);
                console.log(Data.Search);
                SetdataMovies(Data.Search || Data);

            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message)
                }
            }
            setLoading(false)
        }
        getData()

        return function () {
            controller.abort();
        }
    }, [value])


    return { dataMovies, error, loading }
}