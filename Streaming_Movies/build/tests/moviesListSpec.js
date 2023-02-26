"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const movieListModel_1 = require("../models/movieListModel");
const store = new movieListModel_1.MovieListModel();
describe('Movie List API', () => {
    let createdMovieList;
    const movieList = {
        id: 1,
        userListID: 1,
        movieID: 1,
        name: 'My Movie List'
    };
    describe('POST /movielist', () => {
        it('creates a new movie list', async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .post('/movielist')
                .send(movieList);
            createdMovieList = response.body[0];
            expect(response.status).toBe(200);
            expect(createdMovieList.userListID).toEqual(movieList.userListID);
            expect(createdMovieList.movieID).toEqual(movieList.movieID);
            expect(createdMovieList.name).toEqual(movieList.name);
        });
    });
    describe('GET /movielist/:id', () => {
        it('returns a movie list by id', async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/movielist/${createdMovieList.id}`);
            expect(response.status).toBe(200);
            expect(response.body[0].userListID).toEqual(createdMovieList.userListID);
            expect(response.body[0].movieID).toEqual(createdMovieList.movieID);
            expect(response.body[0].name).toEqual(createdMovieList.name);
        });
    });
    describe('GET /movielist', () => {
        it('returns a list of all movie lists', async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get('/movielist');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
    describe('PATCH /movielist/:id', () => {
        it('updates a movie list', async () => {
            const updatedMovieList = {
                id: 1,
                userListID: 1,
                movieID: 2,
                name: 'My Updated Movie List'
            };
            const response = await (0, supertest_1.default)(server_1.app)
                .patch(`/movielist/${createdMovieList.id}`)
                .send(updatedMovieList);
            const updated = response.body[0];
            expect(response.status).toBe(200);
            expect(updated.userListID).toEqual(updatedMovieList.userListID);
            expect(updated.movieID).toEqual(updatedMovieList.movieID);
            expect(updated.name).toEqual(updatedMovieList.name);
        });
    });
    describe('DELETE /movielist/:id', () => {
        it('deletes a movie list', async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .delete(`/movielist/${createdMovieList.id}`);
            expect(response.status).toBe(200);
        });
    });
});
