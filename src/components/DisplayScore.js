import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import '../css/displayscore.css'

export class DisplayScore extends Component {
    render() {

        let scoresArray = this.props.scores
        let totalScore = this.props.total
        let allSubjects = this.props.subjects


        return (
            <div className=''>
                <div className='display-scorediv'>
                    <div className='pt-4 pb-3'>
                        <h2 className='text-center mb-0'>Result</h2>
                    </div>
                    <div className='px-4 mb-4'>
                        <p className='fw-semibold h5'><span className='score-info'>Name: </span><span className='score-info-info'>{localStorage.getItem("userName")}</span></p>
                    </div>
                    <div className='px-sm-4 px-2'>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Subjects</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{allSubjects[0]}</th>
                                    <th>{scoresArray[0]}</th>
                                </tr>
                                <tr>
                                    <th>{allSubjects[1]}</th>
                                    <th>{scoresArray[1]}</th>
                                </tr>
                                <tr>
                                    <th>{allSubjects[2]}</th>
                                    <th>{scoresArray[2]}</th>
                                </tr>
                                <tr>
                                    <th>{allSubjects[3]}</th>
                                    <th>{scoresArray[3]}</th>
                                </tr>
                            </tbody>
                        </Table>
                        <div className='py-5'>
                            <p className='text-center'><span className='fw-semibold'>Total Score: </span> <span className='fw-bold fs-5'> {totalScore}</span></p>
                            <p className='text-center'>Time Used: {localStorage.getItem('timeUsed')}</p>
                        </div>
                    </div>
                    <div className='submitbtn-div'>
                        <button className=''><Link to="/preview answers" state={{ questions: this.props.newdatas }} className='text-decoration-none w-100 h-100 d-inline-block py-3 px-sm-5 px-3 text-white'>Preview Answers</Link></button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayScore