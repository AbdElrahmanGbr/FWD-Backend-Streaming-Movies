"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const userListRoutes_1 = __importDefault(require("../handlers/userListRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, userListRoutes_1.default)(app);
describe('User List API', () => {
    let userlistId;
    it('should create a new user list item', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/userlist')
            .send({
            userID: 1,
            movieID: 2,
        });
        expect(res.status).toEqual(200);
        expect(res.body.userID).toEqual(1);
        expect(res.body.movieID).toEqual(2);
        userlistId = res.body.id;
    });
    it('should return a list of user lists', async () => {
        const res = await (0, supertest_1.default)(app).get('/userlist');
        expect(res.status).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('should return a single user list item', async () => {
        const res = await (0, supertest_1.default)(app).get(`/userlist/${userlistId}`);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);
    });
    it('should update an existing user list item', async () => {
        const res = await (0, supertest_1.default)(app)
            .patch(`/userlist/${userlistId}`)
            .send({
            userID: 1,
            movieID: 3,
        });
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);
        expect(res.body.userID).toEqual(1);
        expect(res.body.movieID).toEqual(3);
    });
    it('should delete a user list item', async () => {
        const res = await (0, supertest_1.default)(app).delete(`/userlist/${userlistId}`);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(userlistId);
        const verify = await (0, supertest_1.default)(app).get(`/userlist/${userlistId}`);
        expect(verify.status).toEqual(404);
    });
});
