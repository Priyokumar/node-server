export const allSideNavs: ISideNav[] = [

    { title: 'Dashboard', path: '/home', icon: 'home', hasSubmenu: false, submenu: [] },

    {
        title: 'Cluster Information', path: '', icon: 'cloud_circle', hasSubmenu: true, submenu:
            [
                { title: 'Pods', path: '/pods', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Services', path: '/svcs', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Volumes', path: '/volumes', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Config Maps', path: '/config-maps', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Secrets', path: '/secrets', icon: 'dashboard', hasSubmenu: false, submenu: [] },
                { title: 'Stateful Sets', path: '/statefulsets', icon: 'dashboard', hasSubmenu: false, submenu: [] },
            ]
    },
];

export interface ISideNav {
    title: string;
    path: string;
    icon: string;
    hasSubmenu: boolean;
    submenu: ISideNav[];
    isExternalUrl?: boolean;
}
