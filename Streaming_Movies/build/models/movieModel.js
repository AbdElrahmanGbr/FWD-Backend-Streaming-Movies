"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const database_1 = __importDefault(require("../database"));
class MovieModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM movies;`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get movies ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM movies where is = ($1);`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get movie of id ${id} ${err}`);
        }
    }
    async create(m) {
        try {
            const conn = await database_1.default.connect();
            const query = `INSERT INTO Movies (name, releaseDate) values ($1, $2)`;
            const result = await conn.query(query, [m.name, m.releaseDate]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot add movie ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `DELETE FROM movies where id = ($1)`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot delete movie of id ${id} ${err}`);
        }
    }
    async update(id, m) {
        try {
            const conn = await database_1.default.connect();
            // const query = `UPDATE TABLE Movies set name= COALESCE($2, name), releaseDate = COALESCE($3, releaseDate) where id = ${id} RETURNING *`;
            const query = `UPDATE TABLE Movies set name= ($1), releaseDate = ($2) where id = ${id} RETURNING *;`;
            const result = await conn.query(query, [m.name, m.releaseDate]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot update movie of id ${id} ${err}`);
        }
    }
}
exports.MovieModel = MovieModel;
