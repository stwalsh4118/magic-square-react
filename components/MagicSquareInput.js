
export default function MagicSquareInput({onMagicSquareInput}) {
    return(
        <div className="py-5 flex flex-row w-full">
            <form onSubmit={(event) => {onMagicSquareInput(event)}}>
                <input className="w-20 flex-grow text-center" type="number"/>
                <button type="submit" className="flex-grow bg-gray-200 rounded-lg border border-black">Get Magic Square</button>
            </form>
        </div>
    )
}