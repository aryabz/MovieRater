import { useEffect, useState } from "react";
import SelectStar from "./selectStar";
import { Commet, ThreeDot } from 'react-loading-indicators';
import "bootstrap-icons/font/bootstrap-icons.css";
import { useFetch } from "./useFetch";
import { useLocalStorage } from "./useLocalStorage";

const Key = "ea397b57"




export default function App() {
    const [movieSelected, setMovieSelected] = useState("tt4158110");

    const { saveData, setSaveData } = useLocalStorage([], "movies")

    const [goSave, setGoSave] = useState(false);

    function selectMoviesID(id) {
        setMovieSelected(id)
        setGoSave(false)
    }

    function handlerDelet(id) {
        setSaveData(SaveData => SaveData.filter(SaveData => SaveData.imdbID !== id))
    }




    return (
        <div>{goSave ? <div className="save-movies disply-flex">{saveData.map((Data) => <DavaSaveMovies Data={Data} onClick={handlerDelet} />)}</div> :
            <Header movieSelected={movieSelected} saveData={saveData} setSaveData={setSaveData} clickGo={() => setGoSave(true)} />}
            <Main setMovieSelected={selectMoviesID} />
        </div>
    )
}

function Header({ movieSelected, setSaveData, saveData, clickGo }) {

    const [numberChangeStar, setNumberChangeStar] = useState()
    const [isOpen, setIsOpen] = useState(false)

    function handlerSaveData(data) {
        setSaveData(SaveData => [...SaveData, { ...data, numberChangeStar }])
        setIsOpen(false)

    }

    const { dataMovies: getMovie, error, loading: loadingHeader } = useFetch(`http://www.omdbapi.com/?apikey=${Key}&i=`, movieSelected)
    const photo = `http://img.omdbapi.com/?apikey=${Key}&i=${movieSelected}  `


    const operation = saveData.some((Data) => Data.Title == getMovie.Title)
    return (
        <>
            {loadingHeader && <LoadingMovieHeader />}


            {
                !loadingHeader &&
                <div className="header" style={{
                    background: ` linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)),url("${photo}")  no-repeat  0% 0%  / cover`,
                }}>

                    <div className="box-movies-header disply-flex ">
                        <img src={getMovie.Poster} alt="" style={{
                            borderRadius: "16px", width: "207px",
                            height: "321px"
                        }} />
                        {/* <Photo url={ } borderRadius={16} /> */}
                        <div className="tozeh disply-flex " style={{ width: "100%" }}>
                            <h1>{getMovie.Title}</h1>
                            <div className="wrpper-border disply-flex justf-between align-center">
                                <ImdbRot roting={getMovie.imdbRating} />
                                <h2>{getMovie.Country}</h2>

                                <h2>{getMovie.Runtime}</h2>

                                <h2>{getMovie.Year}</h2>

                            </div>
                            {!operation && <div onClick={() => setIsOpen(true)} className="open">
                                ⭐ Rate
                            </div>}
                            {isOpen && <StarChaning setNumberChangeStar={setNumberChangeStar} numberChangeStar={numberChangeStar} clickOpen={setIsOpen} clickSave={() => handlerSaveData(getMovie)} />}

                            <p>{getMovie.Plot}</p>

                            <span className="save" onClick={clickGo}>
                                <i class="bi bi-bookmark-fill"></i>
                                <i className="save-number">{saveData.length}</i>
                            </span>
                        </div>
                    </div>
                </div>


            }

        </>

    )
}


function DavaSaveMovies({ Data, onClick }) {
    return (
        <div style={{ color: "#fff" }} className="wrapper-save">
            <img src={Data.Poster} alt={Data.Title} style={{ width: "8rem", borderRadius: "16px" }} />
            <div className="wrapper-save__data">
                <h2 className="margin">{Data.Title}</h2>
                <ImdbRot roting={Data.imdbRating} size={20} />
                <p className="margin">{Data.Year}</p>
                <p className="margin">{Data.Country}</p>
                <h3 className="margin">your start number : {Data.numberChangeStar}⭐</h3>
                <span className="close-movie-save" onClick={() => onClick(Data.imdbID)}><i class="bi bi-x-circle text-danger"></i></span>
            </div>
        </div>
    )
}


function StarChaning({ setNumberChangeStar, numberChangeStar, clickOpen, clickSave }) {


    const messages = [
        "Very Poor 😞",
        "Poor 😕",
        "Fair 😐",
        "Below Average 🙁",
        "Average 😌",
        "Above Average 🙂",
        "Good 😃",
        "Very Good 😄",
        "Excellent 🤩",
        "Perfect 🌟"
    ];

    const green = Math.round((numberChangeStar / 10) * 255);
    const red = 255 - green;
    const color = `rgb(${red},${green},0)`



    return (
        <div className="poup">
            <div className="star disply-flex  justf-center">
                <div className="close" onClick={() => clickOpen(false)}>❌</div>
                {numberChangeStar && <h1 style={{ color }}>{messages[numberChangeStar]}</h1>}
                <SelectStar setNumberChangeStar={setNumberChangeStar} size={"40px"} />
                <button onClick={clickSave}>send</button>
            </div>
        </div>
    )
}

function LoadingMovieHeader() {
    return (
        <div className="disply-flex justf-center align-center" style={{ height: "55vh" }}>
            <Commet color="#ffffff" size="large" text="" textColor="" />
        </div>

    )
}


function ImdbRot({ roting, size = 45 }) {
    return (<div className=" disply-flex align-center" style={{ height: size + 5 }}>
        <span>
            <img src="/imdb-icon.svg" alt="لوگوی IMDb" width={`${size}px`} height={`${size}px`} style={{ margin: "0 0.5rem" }} />
        </span>
        <h2 style={{ fontSize: `${size}px` }}>{roting}</h2>

    </div>)
}


function Main({ setMovieSelected }) {
    // const moviesList = ["a", "b", "c", "d", "e", "f", "h    "]
    const [query, setQuery] = useState("Robot");



    const { dataMovies, error, loading } = useFetch(`http://www.omdbapi.com/?apikey=${Key}&s=$`, query)



    return (
        <div>
            <SendData query={query} setQuery={setQuery} />
            {loading && <LoadingMovieList />}
            {error && <ErrorMovies error={error} />}
            {!error && !loading && <ItemMovies  >
                <div className="wrapper-item disply-flex justf-around">
                    {dataMovies.map(movie => <Item movie={movie} key={movie.imdbID} onClick={setMovieSelected} />)}
                </div>
            </ItemMovies>}
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

function LoadingMovieList() {
    return (
        // <h1 style={{ color: "#fff", textAlign: "center" }}>Loading...</h1>
        <div className="disply-flex justf-center align-center" style={{ height: "300px" }}>
            <ThreeDot color="#ffffff" size="large" text="" textColor="" />

        </div>
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

function ItemMovies({ children }) {
    return (
        <div className="wrapper-item disply-flex justf-around">
            {children}
        </div>
    )
}

function Item({ movie, onClick }) {
    return (
        <div className="item  disply-flex  align-center" onClick={() => onClick(movie.imdbID)}>
            <img src={movie.Poster} alt="" width={"150px"} height={"200px"} style={{ borderRadius: "inherit" }} />
            <h4 style={{ margin: "1rem 0 0 0" }}>{movie.Title}</h4>
            <p>{movie.Year}</p>
        </div>
    )
}
