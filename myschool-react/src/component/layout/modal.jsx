import React, { Component, Fragment } from 'react'
import { Modal } from 'reactstrap'
import { modalService } from "../../service/modal.service"
import "./modal.scss"

class ModalContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,

            Component: null,
            data: {},
            modalConfig: {}
        }
        this.close = this.close.bind(this)
    }

    componentDidMount() {

        this.modalSubscription = modalService.receiveModal().subscribe(data => {
            this.setState({
                isOpen: true,
                Component: data.Component,
                data: data.data,
                modalConfig: data.modalConfig
            })
        })
    }

    componentWillUnmount() {
        this.modalSubscription.unsubscribe()
    }

    close(data) {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
        modalService.sendAfterClosed(data)
    }

    render() {
        return (
            <Fragment>
                <Modal size={this.state.modalConfig.size || "md"} isOpen={this.state.isOpen} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
                    <div className="modal-header">
                        <div className="row w-100">
                            <div className="col-md-11 p-0 text-center"><h5>{this.state.modalConfig.title}</h5>
                            </div>
                            <div className="col-md-1 p-0 text-right">
                                <i className="fas fa-times cursor-pointer" onClick={() => { this.close() }}></i>
                            </div>
                        </div>
                    </div>
                    {
                        this.state.Component && (
                            <div className="p-3">
                                <this.state.Component {...this.state.data} close={this.close} />
                            </div>
                        )
                    }
                </Modal>
            </Fragment>
        )
    }
}
export default ModalContainer;