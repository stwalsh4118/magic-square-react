import {Component, useState, useEffect} from "react"
import MagicSquareCell from "../components/MagicSquareCell"
import MagicSquareRow from "../components/MagicSquareRow"
import MagicSquareHolder from "../components/MagicSquareHolder"

export default function MagicSquareApp() {


    const [dimension, setDimension] = useState(3)
    const [square, setSquare] = useState(initMagicSquare(dimension))

    function getRandomInt(max) {
        return Math.floor(Math.random() * max) + 1;
      }

    function initMagicSquare(dim) {
        const numbers = []
        for(let i = 0; i < dim; i++) {

            let row = []
            for(let j = 0; j < dim; j++) {
                let rand = getRandomInt(dim*dim)
                console.log(rand)
                row.push(rand)
            }
            numbers.push([row])
        }
        console.log(numbers)
        return numbers
    }



    return(
        <>
        <div className="border-2 border-black table" id="MagicSquareHolder">
            <MagicSquareHolder dimension={dimension} square={square}/>
        </div>
        <button onClick={()=>{setDimension(5),setSquare([...initMagicSquare(5)])}}>Random Square</button>
        </>
    )
}