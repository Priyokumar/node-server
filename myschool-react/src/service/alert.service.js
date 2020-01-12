import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(null);

export const alertService = {

    sendAlert: (alert) => {
        subject.next(alert)
    },
    getAlert: () => {
        return subject.asObservable()
    }

};