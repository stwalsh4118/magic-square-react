import MagicSquareRow from "./MagicSquareRow"

export default function MagicSquareHolder({square}) {

    const initSquare = () => {
        const dimension = square.length
        const rows = []

        if(square.length == dimension) {
            for(let i = 0; i < dimension; i++) {

                let numbers = []
                for(let j = 0; j < dimension; j++) {
                    numbers.push(square[i][j])
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