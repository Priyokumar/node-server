import * as http from "http";
import App from "./app";
import { CONFIG } from "./util/config";

class Server {

    private server;
    private port = process.env.PORT || CONFIG.PORT;

    constructor() {
        this.server = http.createServer(App);
    }

    public startServer() {
        this.server.listen(this.port, () => {
            console.log("Listening to the port" + this.port);
        });
    }
}

export default new Server();
