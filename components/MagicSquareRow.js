import MagicSquareCell from "./MagicSquareCell"

export default function MagicSquareRow({numbers}) {

    const initRow = () => {

        const cells = []

        for(let i = 0; i < numbers.length; i++) {
            cells.push(<MagicSquareCell key={i} number={numbers[i]}/>)
        }

        return (
            <>
            {cells}
            </>
        )
    }

    return(
        <div className="flex flex-row">{initRow()}</div>

    )
}