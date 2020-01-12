import React, { Component, Fragment } from 'react'
import { getUsers, updateUserRole, deleteUser } from "../../store/action/user.action"
import { getRoles } from "../../store/action/role.action"
import "./user.component.scss"
import { Link } from "react-router-dom"
import { navService } from "../../service/nav-service"

class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            role: "",
            user: null,
            selectedIndex: -1,
            roles: [],
            users: [],
            isLoading: false,
            hasError: false,
            hasSucceeded: false
        }

    }

    async componentDidMount() {

        try {

            navService.setLoadingStatus(true)
            let users = await getUsers()
            let roles = await getRoles()
            this.setState({ users: users, roles: roles })
            navService.setLoadingStatus(false)

        } catch (error) {
            this.setState({ hasError: true })
            navService.setLoadingStatus(false)
        }
    }

    async updateUserRole(user) {
        user.role = this.state.role

        try {
            navService.setLoadingStatus(true)
            await updateUserRole(user)
            let users = await getUsers()
            this.setState({ users: users, selectedIndex: -1 })
            navService.setLoadingStatus(false)
        } catch (error) {
            this.setState({ hasError: true })
            navService.setLoadingStatus(false)
        }

    }

    onClickChangeRole(index) {
        this.setState({
            selectedIndex: index
        })
    }

    async delete(id) {

        try {
            navService.setLoadingStatus(true)
            await deleteUser(id)
            let users = await getUsers()
            this.setState({ users: users })
            navService.setLoadingStatus(false)
        } catch (error) {
            this.setState({ hasError: true })
            navService.setLoadingStatus(false)
        }
    }

    render() {
        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Users
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-6 text-right action-col">
                        <button type="button" className="btn btn-secondary btn-sm"><Link to={"/module/users/add"} className="breadcrumb-link">Add Users</Link></button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12 pl-0 pr-0">
                        <div className="page-conatiner pl-5 pr-5 pt-4">

                            <table className="table table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Is Activated</th>
                                        <th scope="col">Role</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this
                                            .state
                                            .users
                                            .map((user, index) => {
                                                return (
                                                    <tr key={index + user._id}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.isActivated
                                                            ? "Yes"
                                                            : "No"}</td>
                                                        <td>
                                                            {user.role ? (
                                                                <span>{user.role.name}</span>
                                                            ) :
                                                                (
                                                                    <span>No role assigned</span>
                                                                )
                                                            }
                                                        </td>
                                                        <td>
                                                            {this.state.selectedIndex !== index && (
                                                                <div style={{ "display": "flex", "flexDirection": "row" }}>
                                                                    <span>
                                                                        <button type="button" className="btn btn-primary btn-sm" onClick={() => { this.onClickChangeRole(index) }}>
                                                                            {user.role ? "Change Role" : "Add Role"}
                                                                        </button>
                                                                    </span> &nbsp;
                                                                    <span>
                                                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => { this.delete(user._id) }}>
                                                                            <i className="fas fa-trash-alt"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {this.state.selectedIndex === index &&
                                                                <div class="input-group">
                                                                    <select class="custom-select" id="inputGroupSelect04" onChange={(e) => {
                                                                        this.setState({ role: e.target.value })
                                                                    }}>
                                                                        <option selected value="">Select a role</option>

                                                                        {this.state.roles.map((role, roleIndex) => {
                                                                            return (
                                                                                <option key={roleIndex + role._id} value={role._id}>{role.name}</option>
                                                                            )
                                                                        })}

                                                                    </select>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-success" type="button" onClick={() => { this.updateUserRole(user) }}>Update</button>
                                                                    </div>
                                                                    <div class="input-group-append">
                                                                        <button class="btn btn-danger" type="button" onClick={() => {
                                                                            this.setState({
                                                                                selectedIndex: -1
                                                                            })
                                                                        }}>Cancel</button>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default User