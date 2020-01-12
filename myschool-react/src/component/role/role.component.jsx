import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getRolesAction, deleteRoleAction } from "../../store/action/role.action"
import { Spinner } from 'reactstrap';
import { Link } from "react-router-dom"

class Role extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getRolesAction())
    }

    render() {

        console.log(this.props)

        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Roles
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm"><Link to={"/module/roles/add"} className="breadcrumb-link">Add Role</Link></button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pl-0 pr-0">
                        <div className="page-conatiner pl-5 pr-5 pt-4" style={{ "display": "flex", "flexDirection": "row", "width": "100%", "flexWrap": "wrap" }}>

                            {this.props.isLoading
                                ? (
                                    <div className="spinner-container">
                                        <Spinner /><br />
                                        <span>Loading roles....</span>
                                    </div>
                                )
                                : (
                                    this
                                        .props
                                        .roles
                                        .map((element, index) => {
                                            return (
                                                <div key={index} className="card text-white bg-info mb-3" style={{ "width": "32%", "marginRight": "2px" }}>
                                                    <div className="card-header pr-1 pl-1">
                                                        <div className="row">
                                                            <div className="col-md-8">
                                                                <span> {element.name}</span></div>
                                                            <div className="col-md-4 text-right">
                                                                <i className="fas fa-edit cursor-pointer" onClick={() => {
                                                                    this.props.history.push("/module/roles/" + element._id + "/edit")
                                                                }}></i> &nbsp;
                                                                        <i className="fas fa-trash-alt cursor-pointer" onClick={() => {
                                                                    this.props.dispatch(deleteRoleAction(element._id))
                                                                    this.props.dispatch(getRolesAction())
                                                                }}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body pt-1">

                                                        {
                                                            element.menus && element.menus.length > 0 ? (

                                                                <div>
                                                                    <span className="card-title ">Menus</span>
                                                                    <ol className="pl-5">
                                                                        {element.menus.map((menu, menuIndex) => {
                                                                            return (
                                                                                <Fragment key={menuIndex}>
                                                                                    <li >
                                                                                        {menu.name}
                                                                                    </li>
                                                                                    <ul>
                                                                                        {menu.subMenus.map((submenu, submenuIndex) => {
                                                                                            return (
                                                                                                <li key={submenuIndex}>{submenu.name}</li>
                                                                                            )
                                                                                        })}
                                                                                    </ul>
                                                                                </Fragment>
                                                                            )
                                                                        })}
                                                                    </ol>
                                                                </div>


                                                            ) : (
                                                                    <span className="lead">No menus</span>
                                                                )
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                )
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {

    console.log("mapStateToProps")
    console.log(state)

    return { roles: state.rolesReducer.roles, isLoading: state.commonReducer.isLoading, hasError: state.commonReducer.hasError }
}

export default connect(mapStateToProps)(Role)