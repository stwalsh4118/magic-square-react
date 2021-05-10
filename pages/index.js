import {useState, useEffect} from "react"
import MagicSquareHolder from "../components/MagicSquareHolder"
import MagicSquareInput from "../components/MagicSquareInput"

export default function MagicSquareApp() {


    const [dimension, setDimension] = useState(3)
    const [square, setSquare] = useState(initMagicSquare(3))
    const [isMagicSquare, setIsMagicSquare] = useState(true)
    
    useEffect(() => {
        document.querySelector("html").classList.add("overflow-auto")
    })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    function initRandomSquare(dim) {

        //create an array of consecutive numbers to pull random numbers from
        const numbersToBePlaced = [...Array(dim*dim).keys()]
        const numbers = []
        for(let i = 0; i < dim; i++) {

            let row = []
            for(let j = 0; j < dim; j++) {
                let rand = getRandomInt(numbersToBePlaced.length)
                let numberToPlace = parseInt(numbersToBePlaced.splice(rand,1)) + 1
                console.log(numberToPlace)
                row.push(numberToPlace)
            }
            numbers.push(row)
        }
        
        return numbers
    }

    function initEmptySquare(dim) {
        console.log(dim === 3)
        console.log("empty square dim " + dim)
        const array = Array(dim).fill().map(() => Array(dim).fill(0))
        console.log(array)
        return [...array]
    }

    function initMagicSquare(dim) {
        
        //this method only works for squares of odd order, so if our given dimension is even then just spit out a random square
        if(dim % 2 != 1){
            return initRandomSquare(dim)
        } 

        //get initial position of 1

        let i = Math.floor(dim/2)
        let j = dim - 1

        //initialize an empty square of order dim

        const MagicSquare = initEmptySquare(dim)

        for (let num = 1; num <= dim * dim;) {

            //if both of our indices are out of bounds "wrap" to the other side of the square
            if (i == -1 && j == dim)
            {
                j = dim - 2
                i = 0
            }
            else {
                
                //if we go past the end of the columns "wrap" to the other side
                if (j == dim)
                    j = 0
                
                //if we go past the end of the rows "wrap" to the other side
                if (i < 0)
                    i = (dim - 1)
            }
            
            //if the current cell has already been assigned, move via the break point to next open cell
            if (MagicSquare[i][j] != 0) {
                j -= 2
                i++
                continue
            }
            else
                //set the current cell to the current number then increment
                MagicSquare[i][j] = num++;
     
            //move up and right
            j++
            i--
        }

        return [...MagicSquare]
        
    }

    function checkMagicSquare(MagicSquare) {
        
        //calculate the magic constant of the square using its dimension to check our sums against
        const dim = MagicSquare.length
        const MagicConstant = dim*((dim*dim)+1)/2

        //calculate the primary and secondary diagonal sums, if they dont equal then the square is obviously not magic
        //could also check against the magic constant, either works
        let primaryDiag = 0
        for(let i = 0; i < dim; i++) {
            primaryDiag += MagicSquare[i][i]
        }
        let secondaryDiag = 0
        for(let i = 0; i < dim; i++) {
            secondaryDiag += MagicSquare[i][dim-1-i]
        }

        if(secondaryDiag != primaryDiag) {
            return false
        }

        //loop through the the square
        for(let i = 0; i < dim; i++) {

            let rowSum = 0
            let colSum = 0

            //calculate the sums of both the rows and columns, we can do both at the same time by just swaping the indices
            for(let j = 0; j < dim; j++) {
                rowSum += MagicSquare[i][j]
                colSum += MagicSquare[j][i]
            }

            //if ever the row or column sums do not equal the magic constant then the square is not magic
            if(rowSum != MagicConstant || colSum != MagicConstant) {
                return false
            }
        }

        //if we make it through the loop with out having a sum that doesn't equal the magic constant then our square is indeed magic
        return true
    }

    function handleMagicSquareInput(event) {
        event.preventDefault()
        const newMagicSquare = [...initMagicSquare(parseInt(event.target[0].value))]
        setSquare(newMagicSquare)
        setIsMagicSquare(checkMagicSquare(newMagicSquare))
        setDimension(parseInt(event.target[0].value))

    }

    function randomColorPicker() {
        return "#"+Math.floor(Math.random()*16777215).toString(16);
    }

    function handleChangeColorOnClick(event) {
        event.target.style.color = randomColorPicker()
    }


    return(
        <div id="app-containter" className="flex flex-col text-center items-center select-none">
            <h1 onClick={(event)=>{handleChangeColorOnClick(event)}} id="app-title" className="cursor-pointer select-none text-2xl pb-5" style={{color:randomColorPicker()}}>Magic Square Simulator</h1>
            <div>This square {console.log(isMagicSquare)}{isMagicSquare ? "is" : "is not"} a Magic Square!</div>
            {square.length % 2==0 && <div>Magic Square not generated for even order, Random Square generated instead.</div>}
            <div className="flex flex-col">
                <div className="border-2 border-black table" id="MagicSquareHolder">  
                    <MagicSquareHolder square={square}/>
                </div>
                
            </div>
            <MagicSquareInput onMagicSquareInput={handleMagicSquareInput}/>
            
        </div>
    )
}

