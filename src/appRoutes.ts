import { RequestHandler } from "express";
import { PathParams } from "express-serve-static-core";
import sampleRoute from "./router/sample.route";

class AppRoutes {

    private routers: IAppRouteInfo[] = [];

    public routes() {
        this.routers.push({ path: "/", router: sampleRoute });
        return this.routers;
    }

}

export interface IAppRouteInfo {
    path: PathParams;
    router: RequestHandler;
}

export default new AppRoutes();
