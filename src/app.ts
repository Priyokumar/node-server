import express from "express";
import AppRoutes from "./routes";

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.setRoutes();
    }

    private setRoutes(): void {
        const routes = AppRoutes.routes();
        routes.forEach((appRoute) => {
            this.express.use(appRoute.path, appRoute.router);
        });
    }

}

export default new App().express;
