import { useState } from "react"

export default function SelectStar({ setNumberChangeStar, size }) {
    const [starCount, setstarCount] = useState(0)
    const [CountHover, setCountHover] = useState(0)

    function handleStarClick(number) {
        setstarCount(number)
        setNumberChangeStar(number)
    }
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div> {Array.from({ length: 10 }, (_, i) => <Star
                key={i}
                size={size}
                click={() => handleStarClick(i + 1)}
                hover={() => setCountHover(i + 1)}
                hoverOut={() => setCountHover(0)}
                fill={CountHover ? CountHover < i + 1 : starCount < i + 1} />)}

            </div>
            {/* <h1>{CountHover || starCount || ""}</h1> */}
        </div>
    )
}

function Star({ click, fill, hover, hoverOut, size }) {
    return (
        <span onClick={click} onMouseEnter={hover} onMouseLeave={hoverOut}>

            {fill ? <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 
                        5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
                :

                <svg width={size} height={size} viewBox="0 0 24 24" fill="gold" stroke="orange" stroke-width="2" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77
             5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>}

        </span>
    )
}


