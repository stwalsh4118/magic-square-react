
export default function MagicSquareInput({onMagicSquareInput}) {
    return(
        <div className="py-5 flex flex-row space-x-3">
            <form className="flex space-x-3" onSubmit={(event) => {onMagicSquareInput(event)}}>
                <input className="w-20 text-center border border-black" type="number"/>
                <button type="submit" className="bg-gray-200 focus:outline-none active:shadow-inner active:bg-gray-300 rounded-lg border border-black">Get Magic Square</button>
            </form>
        </div>
    )
}