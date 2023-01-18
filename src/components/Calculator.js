import React, { Component } from 'react'
import '../css/calculator.css'


export default class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prevValue: '',
            currentValue: '0',
            operator: ''
        };
    }

    render() {

        const joinInteger = (e) => {
            let button = e.target

            if (button.value === "." && this.state.currentValue.includes(".")) return;
            if (this.state.currentValue === '0') {
                this.setState({ currentValue: this.state.currentValue.slice(0, -1) + button.value })
            } else {
                this.setState({ currentValue: this.state.currentValue + button.value })
            }
            //console.log(typeof currentValue)
        }

        const joinOperator = (e) => {
            let button = e.target
            this.setState({prevValue: this.state.currentValue})
            this.setState({currentValue: '0'})
            this.setState({operator: button.value})

            let prev = parseFloat(this.state.prevValue)
            let current = parseFloat(this.state.currentValue)
            let computation

            if (prev === '') return;
            switch (this.state.operator) {
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
            console.log(computation)
        }

        const updateAnswer = () => {

        }

        const clearAllEntries = () => {
            this.setState({ currentValue: '0' })
            this.setState({ prevValue: '' })
            this.setState({operator: ''})
        }


        return (
            <div className='calculator-body mx-auto'>
                <div className='calculator-subdiv px-3 py-4'>
                    <h6 className=''>Calculator</h6>
                    <div className='calculator-display mb-3'>
                        <p className='prevValue m-0'>{this.state.prevValue}</p>
                        <p className='currentValue m-0'>{this.state.currentValue}</p>
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
                            <button value='*' onClick={(e) => { joinOperator(e) }}>x</button>
                            <button value=''>x&#179;</button>
                            <button value='' onClick={(e) => { }}>√</button>
                        </div>
                        <div className='calculator-btndivs d-flex flex-column'>
                            <button value='C' onClick={() => { clearAllEntries() }}>C</button>
                            <button value='+' onClick={(e) => { joinOperator(e) }}>+</button>
                            <button value='=' className='flex-fill fs-4 last-btn' onClick={() => { updateAnswer() }}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}