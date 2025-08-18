import SelectStar from "./selectStar";

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
                        <Country nameCountry={"United States, Germany"} />
                        <Minit min={115} />
                        <Year movieYear={2015} />
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

function Country({ nameCountry }) {
    return (
        <h2>{nameCountry}</h2>
    )
}

function Minit({ min }) {
    return (
        <h2>{min} min</h2>
    )
}

function Year({ movieYear }) {
    return (
        <h2> {movieYear}</h2>
    )
}


function Main() {
    const moviesList = ["a", "b", "c", "d", "e", "f", "h    "]
    return (
        <div>
            <SendData />
            <ItemMovies moviesList={moviesList} />
        </div>
    )
}
function SendData() {
    return (
        <form className="search-box-movie">
            <input type="text" className="search-box-movie__input" />
            <button className="search-box-movie__button">🔎</button>
        </form>
    )
}

function ItemMovies({ moviesList }) {
    return (
        <div className="wrapper-item disply-flex justf-around">
            {moviesList.map(movie => <Item movie={movie} />)}

        </div>
    )
}

function Item({ movie }) {
    return (
        <div className="item justf-center disply-flex justf-center">
            <img src="https://img.uptvs.com/uploads/2020/07/Mr-Robot-s4-poster-207x290.jpg" alt="" width={"150px"} />
        </div>
    )
}
