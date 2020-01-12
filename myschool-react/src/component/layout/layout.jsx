import React, { Component, Fragment } from 'react'
import Header from './header'
import { Dashboard } from '../dashboard/dashboard'
import SideNav from './sidenav'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'
import User from '../user/user.component'
import AddUpdateUser from "../user/user-add.component"
import Role from '../role/role.component'
import AddUpdateRole from '../role/add-update-role.component'
import ViewRole from '../role/view-role.component'
import { Spinner } from 'reactstrap'
import { navService } from "../../service/nav-service"
import Employees from '../employee/employees.component'
import AddEmployee from '../employee/add-employee.component'
import EmployeeView from '../employee/employee-view.component'
import EmployeeSalary from '../employee/employee-salary.component'
import EmployeeSalaryPayments from '../employee/employee-salary-payments.component'
import EmployeeSalaryPaymentAddEdit from '../employee/employee-salary-payment-add-edit.component'
import EmployeeSalaryPaymentView from '../employee/employee-salary-payment-view.component'
import ModalContainer from "../layout/modal"
import { alertService } from "../../service/alert.service"

class Layout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showLoader: false,
            openModal: false,
            modalConfigData: null,
            alerts: []
        }
    }

    componentDidMount() {

        this.subscription = navService.getLoadingStatus().subscribe(status => {
            this.setState({ showLoader: status })
        })

        this.alertSubscription = alertService.getAlert().subscribe(alert => {

            if (alert) {
                let alerts = this.state.alerts
                alerts.push(alert)
                this.setState({ alerts: alerts })
            }
        })
    }

    componentWillUnmount() {
        this.subscription.unsubscribe()
        this.alertSubscription.unsubscribe()
    }

    getAlertClassNames(alert) {

        let classes = "alert alert-dismissible fade show shadow"

        if (alert.type === "success")
            classes += " alert-success"
        else if (alert.type === "warning")
            classes += " alert-warning"
        else if (alert.type === "danger")
            classes += " alert-danger"

        return classes
    }

    render() {
        console.log("mapStateToProps props")
        console.log(this.props)
        return (
            <Fragment>
                <ModalContainer />
                <div style={{ 'background': '#f1f7fa' }}>
                    <Header />
                    <div className="row">
                        <div className="col-md-2 pl-0">
                            <SideNav />
                        </div>
                        <div className="col-md-10 pl-0">
                            <Route exact path={"/module/dashboard"} component={Dashboard} />
                            <Route exact path={"/module/users"} component={User} />
                            <Route exact path={"/module/users/add"} component={AddUpdateUser} />

                            <Route exact path={"/module/roles"} component={Role} />
                            <Route exact path={"/module/roles/add"} component={AddUpdateRole} />
                            <Route exact path={"/module/roles/:roleId/edit"} component={AddUpdateRole} />
                            <Route exact path={"/module/roles/:roleId/view"} component={ViewRole} />

                            <Route exact path={"/module/employees"} component={Employees} />
                            <Route exact path={"/module/employees/add"} component={AddEmployee} />
                            <Route exact path={"/module/employees/salaries"} component={EmployeeSalary} />
                            <Route exact path={"/module/employees/salary-payments"} component={EmployeeSalaryPayments} />
                            <Route exact path={"/module/employees/salary-payments/add"} component={EmployeeSalaryPaymentAddEdit} />
                            <Route exact path={"/module/employees/salary-payments/:id/add"} component={EmployeeSalaryPaymentAddEdit} />
                            <Route exact path={"/module/employees/salary-payments/:id/view"} component={EmployeeSalaryPaymentView} />
                            <Route exact path={"/module/employees/:id/edit"} component={AddEmployee} />
                            <Route exact path={"/module/employees/:id/view"} component={EmployeeView} />
                        </div>
                    </div>
                </div>
                {
                    this.state.showLoader && (
                        <div style={{ "position": "fixed", "top": "0", "height": "100vh", "width": "100vw", "background": "rgba(255,255,255,.622)", "display": "flex", "alignItems": "center", "justifyContent": "center" }}>
                            <Spinner color="warning" style={{ width: '5rem', height: '5rem' }} />
                        </div>
                    )
                }

                {
                    this.state.alerts.length > 0 && (
                        <div style={{ "position": "absolute", "bottom": "50px", "right": "10px" }}>
                            {
                                this.state.alerts.map((alert, index) => {
                                    return (
                                        <div key={index} className={this.getAlertClassNames(alert)} role="alert">
                                            <strong>{alert.message}</strong>
                                            <span class="close cursor-pointer" data-dismiss="alert" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }




            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        title: state.pageHeaderReducer.title
    }
}

export default connect(mapStateToProps)(Layout)

