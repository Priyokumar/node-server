import { Router } from "express";

class SampleRoute {

    public router: Router;

    constructor() {
        this.router = Router();
        this.setSampleRoutes();
    }

    private setSampleRoutes() {

        this.router.get("/", (req, res) => {
            res.json({
                message: "Hello World Service !",
            });
        });
    }
}

export default new SampleRoute().router;
