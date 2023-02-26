"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieListModel = void 0;
const database_1 = __importDefault(require("../database"));
class MovieListModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM movieList;`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get Movie List ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM movieList where is = ($1);`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get userList of id ${id} ${err}`);
        }
    }
    async create(ml) {
        try {
            const conn = await database_1.default.connect();
            const query = `INSERT INTO movieList (movieID, userListID) values ($1, $2)`;
            const result = await conn.query(query, [ml.movieID, ml.userListID]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot add movie list ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `DELETE FROM movieList where id = ($1)`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot delete movie list of id ${id} ${err}`);
        }
    }
    async update(id, ml) {
        try {
            const conn = await database_1.default.connect();
            const query = `UPDATE TABLE movieList set movieID= ($1), userListID = ($2) where id = ${id} RETURNING *;`;
            const result = await conn.query(query, [ml.movieID, ml.userListID]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot update movie list of id ${id} ${err}`);
        }
    }
}
exports.MovieListModel = MovieListModel;
