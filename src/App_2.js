import SelectStar from "./selectStar";

export default function App() {
    return (
        <div>
            <Header />
        </div>
    )
}

function Header() {
    return (
        <div className="header">

            <div className="box-movies-header disply-flex ">
                <div >
                    <img src="https://img.uptvs.com/uploads/2020/07/Mr-Robot-s4-poster-207x290.jpg" alt="" className="photo-title" />
                </div>
                <div className="tozeh disply-flex " style={{ width: "100%" }}>
                    <h1>Mr Robot</h1>
                    <div className="wrpper-border disply-flex justf-between align-center">
                        <h2 className=" disply-flex align-center">
                            <span>
                                <img src="/imdb-icon.svg" alt="لوگوی IMDb" width="40" height="40" style={{ margin: "0 0.5rem" }} />
                            </span>
                            8.5 </h2>
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

