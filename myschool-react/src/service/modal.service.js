import { Subject } from 'rxjs';

const openModalSubject = new Subject()
const afterClosedModalSubject = new Subject()

export const modalService = {

    open: (modalConfig) => {
        openModalSubject.next(modalConfig)
    },

    receiveModal: () => {
        return openModalSubject.asObservable()
    },

    sendAfterClosed: (data) => {
        afterClosedModalSubject.next(data)
    },

    afterClosed: () => {
        return afterClosedModalSubject.asObservable()
    }

}