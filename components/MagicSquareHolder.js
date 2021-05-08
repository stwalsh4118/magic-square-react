import MagicSquareRow from "./MagicSquareRow"

export default function MagicSquareHolder({dimension, square}) {

    const initSquare = () => {

        const rows = []

        if(square.length == dimension) {
            for(let i = 0; i < dimension; i++) {

                let numbers = []
                for(let j = 0; j < dimension; j++) {
                    numbers.push(square[i][0][j])
                }
                rows.push(<MagicSquareRow key={i} numbers={numbers}/>)
            }

            return(
                rows
            )
        }
    }
    

    return (
        <>
        {initSquare()}
        </>
    )
}