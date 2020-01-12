import React, { Component, Fragment } from 'react'
import { Textbox, Select, Radiobox } from 'react-inputs-validation'
import { ACADEMIC_NAMES } from "../../constants/common.constant"

class AcademicHistory extends Component {
    state = {
        acaName: "",
        board: "",
        schoolInstitue: "",
        passOutYear: "",
        score: "",
        highestQualification: false
    }

    componentDidMount() {

        let academicHistory = this.props.academicHistory
        if (academicHistory) {
            this.setState({
                name: academicHistory.name,
                board: academicHistory.board,
                schoolInstitue: academicHistory.schoolInstitue,
                passOutYear: academicHistory.passOutYear,
                score: academicHistory.score,
                highestQualification: academicHistory.highestQualification
            })
        }
    }

    close(data) {
        this.props.close()
    }

    add() {
        let academicHistory = this.state

        let data = {
            type: "add_academic_history",
            academicHistory: academicHistory
        }

        if (this.props.index !== null && this.props.index !== undefined)
            data.index = this.props.index

        this.props.close(data)
    }
    render() {
        return (
            <Fragment>
                <div className="row pb-3">
                    <div className="col-md-12 pb-1">
                        <span className="lead">Academic History</span>
                        <hr />
                    </div>

                    <div className="col-md-4 pb-3">
                        <label>Name</label>
                        <Select
                            name={'name'}
                            value={this.state.name}
                            optionList={ACADEMIC_NAMES}
                            onChange={(name, e) => { this.setState({ name }) }}
                            onBlur={() => { }}
                            customStyleOptionListContainer={{
                                maxHeight: '200px',
                                overflow: 'auto',
                                fontSize: '14px'
                            }}
                            validationOption={{
                                name: 'Name',
                                check: true,
                                required: true
                            }} />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Board</label>
                        <Textbox
                            name="board"
                            value={this.state.board}
                            placeholder="Board"
                            onChange={(board, e) => { this.setState({ board }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'Board',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>School / Institute</label>
                        <Textbox
                            name="schoolInstitue"
                            value={this.state.schoolInstitue}
                            placeholder="School / Institute"
                            onChange={(schoolInstitue, e) => { this.setState({ schoolInstitue }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'School / Institute',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Passout Year</label>
                        <Textbox
                            name="passOutYear"
                            value={this.state.passOutYear}
                            placeholder="Passout Year"
                            onChange={(passOutYear, e) => { this.setState({ passOutYear }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                type: "number",
                                name: 'Passout Year',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>
                    <div className="col-md-4 pb-3">
                        <label>Score ( % )</label>
                        <Textbox
                            name="score"
                            value={this.state.score}
                            placeholder="Score"
                            onChange={(score, e) => { this.setState({ score }) }}
                            onBlur={(e) => { }}
                            validationOption={{
                                type: "number",
                                name: 'Score',
                                check: true,
                                required: false,
                            }}
                        />
                    </div>

                    <div className="col-md-4 pb-3">
                        <label>Highest Qualification</label>
                        <Radiobox
                            tabIndex={1}
                            id="highestQualification"
                            name="highestQualification"
                            value={this.state.highestQualification}
                            optionList={[
                                { id: true, name: 'Yes' },
                                { id: false, name: 'No' }
                            ]}
                            customStyleContainer={{
                                display: 'flex',
                                justifyContent: 'flex-start'
                            }}
                            customStyleOptionListItem={{ marginRight: '20px' }}
                            onChange={(highestQualification, e) => {
                                this.setState({ highestQualification });
                            }}
                            onBlur={(e) => { }}
                            validationOption={{
                                name: 'highestQualification',
                                check: true,
                                required: true
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-right">
                        <button type="button" className="btn btn-danger btn-sm w-15" onClick={() => { this.close() }}>Cancel</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-info btn-sm w-15" onClick={() => { this.add() }}>{this.props.index !== undefined ? "Save" : "Add"}</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AcademicHistory;