import {useState} from "react"
import MagicSquareHolder from "../components/MagicSquareHolder"
import MagicSquareInput from "../components/MagicSquareInput"

export default function MagicSquareApp() {


    const [dimension, setDimension] = useState(3)
    const [square, setSquare] = useState(initMagicSquare(dimension))

    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
      }

    function initRandomSquare(dim) {
        const numbers = []
        for(let i = 0; i < dim; i++) {

            let row = []
            for(let j = 0; j < dim; j++) {
                let rand = getRandomInt(dim*dim)
                console.log(rand)
                row.push(rand)
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
        console.log(dim +" odd or even" + (dim % 2 != 1) + " " + (dim % 2))
        if(dim % 2 != 1){
            return initRandomSquare(dim)
        } 

        //magic constant
        const MagicConstant = dim*((dim*dim)+1)/2

        //get initial position of 1

        let i = Math.floor(dim/2)
        let j = dim - 1

        //initialize an empty square of order dim

        const MagicSquare = initEmptySquare(dim)

        for (let num = 1; num <= dim * dim;) {

            if (i == -1 && j == dim) // 3rd condition
            {
                j = dim - 2
                i = 0
            }
            else {
                // 1st condition helper if next number
                // goes to out of square's right side
                
                if (j == dim)
                    j = 0
     
                // 1st condition helper if next number is
                // goes to out of square's upper side
                if (i < 0)
                    i = (dim - 1)
            }
            
            // 2nd condition
            if (MagicSquare[i][j] != 0) {
                j -= 2
                i++
                continue
            }
            else
                // set number
                MagicSquare[i][j] = num++;
     
            // 1st condition
            j++
            i--
        }

        return [...MagicSquare]
        
    }

    function handleMagicSquareInput(event) {
        event.preventDefault()
        setSquare([...initMagicSquare(parseInt(event.target[0].value))])

    }



    return(
        <div className="table relative">
            {square.length % 2==0 && <div>Magic Square not generated for even order, Random Square generated instead.</div>}
            <div className="border-2 border-black table" id="MagicSquareHolder">  
                <MagicSquareHolder square={square}/>
            </div>
            <MagicSquareInput onMagicSquareInput={handleMagicSquareInput}/>
        </div>
    )
}