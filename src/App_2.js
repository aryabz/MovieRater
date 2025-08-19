import { useEffect, useState } from "react";
import SelectStar from "./selectStar";


const Key = "ea397b57"
export default function App() {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

function Header() {
    return (
        <div className="header">

            <div className="box-movies-header disply-flex ">

                <Photo url={"https://img.uptvs.com/uploads/2020/07/Mr-Robot-s4-poster-207x290.jpg"} borderRadius={16} />
                <div className="tozeh disply-flex " style={{ width: "100%" }}>
                    <h1>Mr Robot</h1>
                    <div className="wrpper-border disply-flex justf-between align-center">
                        <ImdbRot roting={8.5} />
                        <h2>United States, Germany</h2>

                        <h2>115 min</h2>

                        <h2> 2015</h2>

                    </div>
                    <div className="About-creators">
                        <SelectStar />
                    </div>
                    <p>In 2035, a technophobic cop investigates a crime that may have been perpetrated by a robot, which leads to a larger threat to humanity.</p>
                </div>
            </div>
        </div>

    )
}

function Photo({ url, borderRadius }) {
    return (
        <img src={url} alt="" className="photo-title" style={{ borderRadius }} />
    )
}

function ImdbRot({ roting }) {
    return (<h2 className=" disply-flex align-center">
        <span>
            <img src="/imdb-icon.svg" alt="لوگوی IMDb" width="40" height="40" style={{ margin: "0 0.5rem" }} />
        </span>
        {roting}
    </h2>)
}


function Main() {
    // const moviesList = ["a", "b", "c", "d", "e", "f", "h    "]
    const [query, setQuery] = useState("Robot");
    const [dataMovies, SetdataMovies] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState()




    useEffect(function () {
        const controller = new AbortController()
        async function getData() {
            setError("")
            setLoading(true)
            try {
                const res = await fetch(`http://www.omdbapi.com/?apikey=${Key}&s=${query}`, { signal: controller.signal });
                console.log(res);
                if (!res.ok) throw new Error("cant conecting server");
                const Data = await res.json();
                if (Data.Response === "False") throw new Error("not fund movies")
                console.log(Data);
                console.log(Data.Search);
                SetdataMovies(Data.Search);

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
    }, [query])

    return (
        <div>
            <SendData query={query} setQuery={setQuery} />
            {loading && <LoadingMs />}
            {error && <ErrorMovies error={error} />}
            {!error && !loading && <ItemMovies moviesList={dataMovies} />}
        </div>
    )
}

function ErrorMovies({ error }) {
    return (
        <h1 style={{ color: "#fff", textAlign: "center" }}>
            {error}
        </h1>
    )
}

function LoadingMs() {
    return (
        <h1 style={{ color: "#fff", textAlign: "center" }}>Loading...</h1>
    )
}

function SendData({ query, setQuery }) {
    return (
        <form className="search-box-movie">
            <input type="text" className="search-box-movie__input" value={query} onChange={e => setQuery(e.target.value)} />
            <button className="search-box-movie__button">🔎</button>
        </form>
    )
}

function ItemMovies({ moviesList }) {
    return (
        <div className="wrapper-item disply-flex justf-around">
            {moviesList.map(movie => <Item movie={movie} key={movie.imdbID} />)}
        </div>
    )
}

function Item({ movie }) {
    return (
        <div className="item  disply-flex  align-center">
            <img src={movie.Poster} alt="" width={"150px"} height={"200px"} style={{ borderRadius: "inherit" }} />
            <h4 style={{ margin: "1rem 0 0 0" }}>{movie.Title}</h4>
            <p>{movie.Year}</p>
        </div>
    )
}
