

export default function MagicSquareCell({number}) {
    return (
        <div className="w-12 h-12 border border-black text-center relative">
        <span className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2">{number}</span>
        </div>
    )
}