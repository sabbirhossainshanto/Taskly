"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
let server;
async function main() {
    try {
        await mongoose_1.default.connect(config_1.default.DATABASE_URL);
        server = app_1.default.listen(config_1.default.port, () => {
            console.log(`Example app listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main().catch((err) => console.log(err));
process.on("unhandledRejection", () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", () => {
    process.exit(1);
});
