"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userListModel = void 0;
const database_1 = __importDefault(require("../database"));
class userListModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM userList;`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get userList ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM userList where id = ($1);`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get userList of id ${id} ${err}`);
        }
    }
    async create(ul) {
        try {
            const conn = await database_1.default.connect();
            const query = `INSERT INTO userList (userID, movieID) values ($1, $2)`;
            const result = await conn.query(query, [ul.userID, ul.movieID]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot add userlist ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `DELETE FROM userList where id = ($1)`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot delete userlist of id ${id} ${err}`);
        }
    }
    async update(id, u) {
        try {
            const conn = await database_1.default.connect();
            const query = `UPDATE TABLE userlist set userID= ($1), movieID = ($2) where id = ${id} RETURNING *;`;
            const result = await conn.query(query, [u.userID, u.movieID]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot update userlist of id ${id} ${err}`);
        }
    }
}
exports.userListModel = userListModel;
