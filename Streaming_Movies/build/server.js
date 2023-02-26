"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./handlers/userRoutes"));
const movieRoutes_1 = __importDefault(require("./handlers/movieRoutes"));
const movieListRoutes_1 = __importDefault(require("./handlers/movieListRoutes"));
const userListRoutes_1 = __importDefault(require("./handlers/userListRoutes"));
exports.app = (0, express_1.default)();
const PORT = 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
(0, userRoutes_1.default)(exports.app);
(0, userListRoutes_1.default)(exports.app);
(0, movieRoutes_1.default)(exports.app);
(0, movieListRoutes_1.default)(exports.app);
exports.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
