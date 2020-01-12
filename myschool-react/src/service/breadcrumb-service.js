
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(false);

export const navService = {
    setLoginStatus: (status) => {
        subject.next(status)
    },
    getLoginStatus: () => subject.asObservable()
};