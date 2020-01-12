import React, { Component, Fragment } from 'react'
import { Link } from "react-router-dom"
import { Textbox, Select } from 'react-inputs-validation'
import { navLinks } from "../layout/navlinks"
import { addRoleAction, getRoleByIdAction, updateRoleAction } from "../../store/action/role.action"
import { resetAction } from "../../store/action/common.action"
import { connect } from 'react-redux'
import { navService } from "../../service/nav-service"


class AddUpdateRole extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "",
            name: "",
            desc: "",
            menu: "",
            submenuSelect: "",
            hasSubmenus: false,
            subMenus: [],
            selectedSubMenus: [],
            selectedbMenus: []
        }

        this.saveRole = this.saveRole.bind(this)
        this.onClickNewRole = this.onClickNewRole.bind(this)
    }

    componentDidMount() {

        this.props.dispatch(resetAction())
        let roleId = this.props.match.params.roleId
        if (roleId)
            this.props.dispatch(getRoleByIdAction(roleId))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoading !== this.props.isLoading) {

            if (this.props.isLoading)
                navService.setLoadingStatus(true)
            else
                navService.setLoadingStatus(false)
        }

        let role = this.props.role
        if (prevProps.role !== role) {
            this.setState({
                name: role.name,
                desc: role.desc,
                selectedbMenus: role.menus
            })
        }
    }

    onClickNewRole() {
        this.props.history.push("/module/roles/add")
    }

    saveRole() {

        let roleReqBody = {
            name: this.state.name,
            desc: this.state.desc,
            menus: this.state.selectedbMenus
        }

        let roleId = this.props.match.params.roleId
        if (roleId)
            this.props.dispatch(updateRoleAction(roleId, roleReqBody))
        else
            this.props.dispatch(addRoleAction(roleReqBody))

    }

    render() {
        console.log(this.state)
        return (
            <Fragment>
                <div className="row breadcrumb-row mt-1 mb-2">
                    <div className="col-md-6">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active">
                                    Add New Role
                </li>
                            </ol>
                        </nav>
                    </div>

                    {this.props.hasSucceded ? (
                        <div className="col-md-6 text-right action-col">
                            <button type="button" className="btn btn-secondary btn-sm" onClick={this.onClickNewRole}>Add New Role</button>
                            &nbsp;
                            <button type="button" className="btn btn-warning btn-sm">
                                <Link to={ "/module/roles"} className="breadcrumb-link">Back</Link>
                            </button>
                        </div>
                    ) : (
                            <div className="col-md-6 text-right action-col">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={this.saveRole}>Save</button>
                                &nbsp;
                                <button type="button" className="btn btn-warning btn-sm">
                                    <Link to={"/module/roles"} className="breadcrumb-link">Cancel</Link>
                                </button>
                            </div>
                        )}

                </div>

                <div className="row">

                    {this.props.hasSucceded ? (
                        <div className="col-md-12 p-0">
                            <div class="alert alert-success" role="alert">
                                <h5 class="alert-heading">Role has successfully added.</h5>
                            </div>
                        </div>
                    ) :

                        (<div className="col-md-12 pl-0 pr-0">
                            <div className="page-conatiner pl-5 pr-5 pt-3">
                                <div className="row pb-3">
                                    <div className="col-md-12 pb-1">
                                        <span className="lead">General Details</span>
                                        <hr />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Name</label>
                                        <Textbox
                                            tabIndex="1"
                                            id={'name'}
                                            name="name"
                                            type="text"
                                            value={this.state.name}
                                            placeholder="Name"
                                            onChange={(name, e) => {
                                                this.setState({ name });
                                                console.log(e);
                                            }}
                                            onBlur={(e) => {
                                                console.log(e)
                                            }}
                                            validationOption={{
                                                name: 'Name',
                                                check: true,
                                                required: true
                                            }} />
                                    </div>

                                    <div className="col-md-4">
                                        <label>Description</label>
                                        <Textbox
                                            tabIndex="1"
                                            id={'desc'}
                                            name="desc"
                                            type="text"
                                            value={this.state.desc}
                                            placeholder="Description"
                                            onChange={(desc, e) => {
                                                this.setState({ desc });
                                                console.log(e);
                                            }}
                                            onBlur={(e) => {
                                                console.log(e)
                                            }}
                                            validationOption={{
                                                name: 'Description',
                                                check: true,
                                                required: true
                                            }} />
                                    </div>
                                </div>
                                {/* Menu  */}
                                <div className="row pb-3">
                                    <div className="col-md-12 pb-1">
                                        <span className="lead">Add Menus</span>
                                        <hr />
                                    </div>
                                    <div className="col-md-4">
                                        <label>Menu</label>
                                        <Select
                                            tabIndex="6"
                                            id={'menu'}
                                            name={'menu'}
                                            value={this.state.menu}
                                            optionList={navLinks}
                                            onChange={(menu, e) => {
                                                this.setState({ menu })

                                                let selectedMenu = navLinks.find(element => { return element.id === menu })
                                                this.setState({ hasSubmenus: selectedMenu.hasSubMenus })

                                                console.log("navLinks")
                                                console.log(navLinks)
                                                console.log("selectedMenu")
                                                console.log(selectedMenu)

                                                if (selectedMenu.hasSubMenus)
                                                    this.setState({ subMenus: selectedMenu.subMenus })
                                                else
                                                    this.setState({ subMenus: [], selectedSubMenus: [], submenuSelect: "" })

                                            }}
                                            onBlur={() => { }}
                                            customStyleOptionListContainer={{
                                                maxHeight: '200px',
                                                overflow: 'auto',
                                                fontSize: '14px'
                                            }}
                                            validationOption={{
                                                name: 'country',
                                                check: true,
                                                required: true
                                            }} />

                                    </div>


                                    {
                                        this.state.hasSubmenus && (
                                            <Fragment>
                                                <div className="col-md-4">
                                                    <label>Sub Menu</label>
                                                    <Select
                                                        tabIndex="6"
                                                        id={'submenuSelect'}
                                                        name={'submenuSelect'}
                                                        value={this.state.submenuSelect}
                                                        optionList={this.state.subMenus}
                                                        onChange={(submenuSelect, e) => {

                                                            this.setState({ submenuSelect })
                                                            let subMenu = this.state.subMenus.find(element => { return element.id === submenuSelect })
                                                            let index = this.state.selectedSubMenus.findIndex(element => { return element.id === submenuSelect })

                                                            /*  */
                                                            if (index < 0) {
                                                                this.setState(prevState => ({
                                                                    selectedSubMenus: [...prevState.selectedSubMenus, subMenu]
                                                                }))
                                                            }
                                                        }}
                                                        onBlur={() => { }}
                                                        customStyleOptionListContainer={{
                                                            maxHeight: '200px',
                                                            overflow: 'auto',
                                                            fontSize: '14px'
                                                        }}
                                                        validationOption={{
                                                            name: 'country',
                                                            check: true,
                                                            required: true
                                                        }} />
                                                    <label>Selected Sub Menus</label>
                                                    <ul className="list-group">
                                                        {
                                                            this.state.selectedSubMenus.map((element, index) => {
                                                                return (
                                                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                                        <span>{element.name}</span>
                                                                        <span className="badge" style={{ 'cursor': 'pointer' }} onClick={(index) => {
                                                                            let remSelSubMenus = this.state.selectedSubMenus.filter(elmn => { return elmn.id !== element.id })
                                                                            this.setState({ selectedSubMenus: remSelSubMenus })
                                                                        }}><i className="fas fa-trash-alt"></i></span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Fragment>
                                        )
                                    }



                                    <div className="col-md-4 pt-4 mt-2">
                                        <button type="button" className="btn btn-info btn-sm pl-4 pr-4" onClick={() => {

                                            let menu = Object.assign({}, navLinks.find(element => { return element.id === this.state.menu }))
                                            let index = this.state.selectedbMenus.findIndex(elem => { return elem.id === this.state.menu })

                                            if (index < 0) {
                                                if (menu.hasSubMenus)
                                                    menu.subMenus = this.state.selectedSubMenus
                                                this.setState(prevState => ({
                                                    selectedbMenus: [...prevState.selectedbMenus, menu]
                                                }))
                                            }

                                            this.setState({
                                                menu: "",
                                                submenuSelect: "",
                                                hasSubmenus: false,
                                                subMenus: [],
                                                selectedSubMenus: []
                                            })

                                        }}>
                                            Add
                                    </button>
                                    </div>
                                </div>

                                <div className="row pb-3">
                                    <div className="col-md-12 pb-3">
                                        <span className="lead">Added Menus</span>
                                        <hr />
                                        <div class="list-group">
                                            {
                                                this.state.selectedbMenus.map((selectedMenu, index) => {
                                                    return (
                                                        <button key={index} href="#" class="list-group-item list-group-item-action flex-column align-items-start">

                                                            <div class="d-flex w-100 justify-content-between">
                                                                <p class="mb-1">{(index + 1) + ". "} {selectedMenu.name}</p>

                                                                <span className="badge" style={{ 'cursor': 'pointer' }} onClick={(index) => {
                                                                    let remSelMenus = this.state.selectedbMenus.filter(elmn => { return elmn.id !== selectedMenu.id })
                                                                    this.setState({ selectedbMenus: remSelMenus })
                                                                }}><i className="fas fa-trash-alt"></i></span>

                                                            </div>

                                                            {
                                                                selectedMenu.hasSubMenus && (
                                                                    <div className="pl-5">
                                                                        <label>Submenus</label>
                                                                        <ul class="list-group list-group-flush">
                                                                            {
                                                                                selectedMenu.subMenus.map((subMenu, menuIndex) => {
                                                                                    return (
                                                                                        <li key={menuIndex} class="list-group-item d-flex justify-content-between align-items-center">
                                                                                            <span>{subMenu.name}</span>
                                                                                        </li>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                )
                                                            }

                                                        </button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {

    console.log("mapStateToProps")
    console.log(state)
    return {
        roles: state.rolesReducer.savedRole,
        role: state.rolesReducer.role,
        isLoading: state.commonReducer.isLoading,
        hasError: state.commonReducer.hasError,
        hasSucceded: state.commonReducer.hasSucceded
    }
}

export default connect(mapStateToProps)(AddUpdateRole)