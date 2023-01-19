import React, { useState } from 'react'
import '../css/calculator.css'

const Calculator = () => {

    let [prevValue, setPrevValue] = useState('');
    let [currentValue, setCurrentValue] = useState("0");
    const [operator, setOperator] = useState('')

    const joinInteger = (e) => {
        let button = e.target

        if (button.value === "." && currentValue.includes(".")) return;
        if (currentValue === '0') {
            if (button.value === '.') {
                setCurrentValue(currentValue + button.value)
            } else {
                setCurrentValue(currentValue.slice(0, -1) + button.value)
            }
        } else {
            setCurrentValue(currentValue + button.value)
        }
        //console.log(typeof currentValue)
    }

    const compute = (e) => {
        let button = e.target;

        try {
            let prev = parseFloat(prevValue.slice(0, -1))
            let current = parseFloat(currentValue)
            let computation

            if (prev === '') return;
            switch (operator) {
                case "+":
                    computation = prev + current
                    break
                case "-":
                    computation = prev - current
                    break
                case "/":
                    computation = prev / current
                    break
                case "*":
                    computation = prev * current
                    break
                case "%":
                    computation = prev / 100 * current
                    break
                default:
                    return
            }
            //console.log(computation)
            setPrevValue(computation + button.value)
            return computation;
        } catch (error) {
            setCurrentValue('Math error')
        }
    }

    const joinOperator = (e) => {
        let button = e.target;

        if (currentValue === '0') return;
        setPrevValue(currentValue + button.value);
        setCurrentValue('0');
        setOperator(button.value);
        compute(e)
    }

    const updateAnswer = (e) => {
        setPrevValue('')
        if (currentValue === '0') return;
        compute(e)

        setCurrentValue(compute(e))
    }

    const clearAllEntries = () => {
        setPrevValue('');
        setCurrentValue('0');
        setOperator('');
    }

    return (
        <div className='calculator-body mx-auto'>
            <div className='calculator-subdiv px-3 py-4'>
                <h6 className=''>Calculator</h6>
                <div className='calculator-display mb-3'>
                    <p className='prevValue m-0'>{prevValue}</p>
                    <p className='currentValue m-0'>{currentValue}</p>
                </div>
                <div className='calculator-btnsdiv d-flex justify-content-between'>
                    <div className='calculator-btndivs d-flex flex-column'>
                        <button value='7' onClick={(e) => { joinInteger(e) }}>7</button>
                        <button value='4' onClick={(e) => { joinInteger(e) }}>4</button>
                        <button value='1' onClick={(e) => { joinInteger(e) }}>1</button>
                        <button value='0' onClick={(e) => { joinInteger(e) }}>0</button>
                    </div>
                    <div className='calculator-btndivs d-flex flex-column'>
                        <button value='8' onClick={(e) => { joinInteger(e) }}>8</button>
                        <button value='5' onClick={(e) => { joinInteger(e) }}>5</button>
                        <button value='2' onClick={(e) => { joinInteger(e) }}>2</button>
                        <button value='.' onClick={(e) => { joinInteger(e) }}>.</button>
                    </div>
                    <div className='calculator-btndivs d-flex flex-column'>
                        <button value='9' onClick={(e) => { joinInteger(e) }}>9</button>
                        <button value='6' onClick={(e) => { joinInteger(e) }}>6</button>
                        <button value='3' onClick={(e) => { joinInteger(e) }}>3</button>
                        <button value='-' onClick={(e) => { joinOperator(e) }}>-</button>
                    </div>
                    <div className='calculator-btndivs d-flex flex-column'>
                        <button value='/' onClick={(e) => { joinOperator(e) }}>/</button>
                        <button value='*' onClick={(e) => { joinOperator(e) }}>&times;</button>
                        <button value='' onClick={(e) => { }}>&times;&#179;</button>
                        <button value='' onClick={(e) => { }}>√</button>
                    </div>
                    <div className='calculator-btndivs d-flex flex-column'>
                        <button value='C' onClick={() => { clearAllEntries() }}>C</button>
                        <button value='+' onClick={(e) => { joinOperator(e) }}>+</button>
                        <button value='=' className='flex-fill fs-4 last-btn' onClick={(e) => { updateAnswer(e) }}>=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator