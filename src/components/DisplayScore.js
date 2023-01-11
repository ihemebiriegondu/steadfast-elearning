import React, { Component } from 'react'
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
                    <div className='py-5'>
                        <h2 className='text-center'>Result</h2>
                    </div>
                    <div className='px-4 mb-4'>
                        <p className='fw-semibold h5'><span className='score-info'>Name: </span><span className='score-info-info'>Egondu</span></p>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayScore