"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("../handlers/userRoutes"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(body_parser_1.default.json());
(0, userRoutes_1.default)(app);
beforeAll(() => {
    app.listen(PORT);
});
describe('Test user routes', () => {
    let testUser;
    it('should create a new user', async () => {
        const response = await (0, supertest_1.default)(app)
            .post('/users')
            .send({
            firstName: 'Abdo',
            lastName: 'Gbr',
            email: 'abdogbr@example.com',
            password: 'password',
        });
        expect(response.status).toBe(200);
        testUser = response.body;
    });
    it('should return a list of users', async () => {
        const response = await (0, supertest_1.default)(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    it('should return the newly created user', async () => {
        const response = await (0, supertest_1.default)(app).get(`/users/${testUser.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
        expect(response.body.firstName).toBe(testUser.firstName);
        expect(response.body.lastName).toBe(testUser.lastName);
        expect(response.body.email).toBe(testUser.email);
    });
    it('should update the newly created user', async () => {
        const response = await (0, supertest_1.default)(app)
            .patch(`/users/${testUser.id}`)
            .send({
            firstName: 'Abdu',
            lastName: 'Gabr',
            email: 'newemail@example.com',
            password: 'newpassword',
        });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
        expect(response.body.firstName).toBe('John');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body.email).toBe('newemail@example.com');
    });
    it('should delete the newly created user', async () => {
        const response = await (0, supertest_1.default)(app).delete(`/users/${testUser.id}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(testUser.id);
    });
});
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500));
});
