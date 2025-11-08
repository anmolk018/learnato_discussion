"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = __importDefault(require("./routes/posts"));
const db_1 = require("./db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/posts', posts_1.default);
app.get('/', (req, res) => res.send({ ok: true }));
(0, db_1.initDb)().then(() => {
    app.listen(port, () => console.log(`Server listening on ${port}`));
});
