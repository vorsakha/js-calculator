import React, {useState, useEffect} from "react"

// problems //
//second+ calcs dont display numbers unless equals is pressed

export default function Calc() {
    const [result, setResult] = useState("")
    const [num1, setNum1] = useState([])
    const [num2, setNum2] = useState([])
    const [sum1, setSum1] = useState(0)
    const [sum2, setSum2] = useState(0)
    const [operator, setOp] = useState("")
    const [actualValue, setValue] = useState("0")
    const [mDisplay, setDisplay] = useState([])
    const [fullDisplay, setFull] = useState("")

    //console.log(num2)
    console.log("mini "+ num1.length)
    console.log("disp "+ fullDisplay.length)

    //handle number and operators
    function handleNum(e) {
        const num = e.target.value
        if(operator === "") {
            if(num === ".") {   
                if(!(num1.includes("."))){
                    setNum1(prev => [...prev, num])
                }
            } else {
                setNum1(prev => [...prev, num])
            }
        } else if (num1 !== 0) {
            if(num === ".") {
                if(!(num2.includes("."))){
                    setNum2(prev => [...prev, num])
                }
            } else {
                setNum2(prev => [...prev, num])
            }
        }
        
    }

    //handle equals button
    function handleCalc() {
        if(operator === "+") {
            setSum1(Number(sum1) + Number(sum2))
            setNum1([Number(sum1) + Number(sum2)])
            setResult(Number(sum1) + Number(sum2))
            setOp("")
            setNum2([])
            setDisplay(prev => mDisplay.length > 0 ?
                [...prev, String(operator) + String(sum2)] :
                [...prev, String(sum1) + String(operator) + String(sum2)])
        } else if(operator === "-") {
            setSum1(Number(sum1) - Number(sum2))
            setNum1([Number(sum1) - Number(sum2)])
            setResult(Number(sum1) - Number(sum2))
            setOp("")
            setNum2([])
            setDisplay(prev => mDisplay.length > 0 ?
                [...prev, String(operator) + String(sum2)] :
                [...prev, String(sum1) + String(operator) + String(sum2)])
        } else if(operator === "x") {
            setSum1(Number(sum1) * Number(sum2))
            setNum1([Number(sum1) * Number(sum2)])
            setResult(Number(sum1) * Number(sum2))
            setOp("")
            setNum2([])
            setDisplay(prev => mDisplay.length > 0 ?
                [...prev, String(operator) + String(sum2)] :
                [...prev, String(sum1) + String(operator) + String(sum2)])
        } else if(operator === "/") {
            setSum1(Number(sum1) / Number(sum2))
            setNum1([Number(sum1) / Number(sum2)])
            setResult(Number(sum1) / Number(sum2))
            setOp("")
            setNum2([])
            setDisplay(prev => mDisplay.length > 0 ?
                [...prev, String(operator) + String(sum2)] :
                [...prev, String(sum1) + String(operator) + String(sum2)])
        }
    }

    //handle AC button
    function handleAc() {
        setSum1(0)
        setValue("0")
        setSum2(0)
        setOp("")
        setNum1([])
        setNum2([])
        setResult("")
        setDisplay([])
    }

    //handle the live display
     useEffect(() => {
        num1.length > 0 && setSum1(num1.reduce((accumulator, currentVal) =>  accumulator + currentVal))
        num2.length > 0 && setSum2(num2.reduce((accumulator, currentVal) =>  accumulator + currentVal))
        num1.length > 0 && setValue(num1.reduce((accumulator, currentVal) =>  accumulator + currentVal))
        num2.length > 0 && setValue(num2.reduce((accumulator, currentVal) =>  accumulator + currentVal))
        result !== "" && setValue(result)
    }, [num1, num2, result])

    //handle the commas in mini-display
    useEffect(() => {
        let splitted = mDisplay.toString().split(",").join("")
        setFull(splitted)
    }, [mDisplay])


    return (
        <div id="calc">
            <input id="mini-display" value={fullDisplay.length >= 37 ? "Number limit reached" : fullDisplay} disabled />
            <input id="display" value={num1.length >= 20 || num2.length >= 20 ? "Number limit reached" : actualValue} disabled />
            <button className="ac" onClick={handleAc}>AC</button>
            <button className="operators" onClick={() => sum1 > 0 && setOp("/")} value="/">/</button>
            <button className="operators" onClick={() => sum1 > 0 && setOp("x")} value="*">x</button>
            <button className="numbers" onClick={handleNum} value="7">7</button>
            <button className="numbers" onClick={handleNum} value="8">8</button>
            <button className="numbers" onClick={handleNum} value="9">9</button>
            <button className="operators" onClick={() => sum1 > 0 && setOp("-")} value="-">-</button>
            <button className="numbers" onClick={handleNum} value="4">4</button>
            <button className="numbers" onClick={handleNum} value="5">5</button>
            <button className="numbers" onClick={handleNum} value="6">6</button>
            <button className="operators" onClick={() => sum1 > 0 && setOp("+")} value="+">+</button>
            <button className="numbers1" onClick={handleNum} value="1">1</button>
            <button className="numbers1" onClick={handleNum} value="2">2</button>
            <button className="numbers1" onClick={handleNum} value="3">3</button>
            <button className="dot" onClick={handleNum} value=".">.</button>
            <button className="zero" onClick={handleNum} value="0">0</button>
            <button className="equals" onClick={handleCalc}value="=">=</button>
            
        </div>
    )
}