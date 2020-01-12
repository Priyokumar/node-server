import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(false);
const loadingSubject = new BehaviorSubject(false);

export const navService = {
    setLoginStatus: (status) => {
        subject.next(status)
    },
    getLoginStatus: () => subject.asObservable(),


    setLoadingStatus: (status) => {
        loadingSubject.next(status)
    },
    getLoadingStatus: () => loadingSubject.asObservable()
};