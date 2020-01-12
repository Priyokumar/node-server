import React, { Fragment } from 'react'

export default function PageHeader(props) {

    return (
        <Fragment>
            <div className="row mt-2">
                <div className="col-md-12 p-2 text-center" style={{'background':'#ffffff'}}>
                    <h3>{props.title}</h3>
                </div>
            </div>
        </Fragment>
    )
}