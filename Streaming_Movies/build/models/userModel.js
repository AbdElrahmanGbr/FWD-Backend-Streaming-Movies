"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM users;`;
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get users ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `SELECT * FROM users where id = ($1);`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get movie of id ${id} ${err}`);
        }
    }
    async create(u) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(u.password, 10);
            const conn = await database_1.default.connect();
            const query = `INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`;
            await conn.query(query, [u.firstName, u.lastName, u.email, hashedPassword]);
            conn.release();
        }
        catch (err) {
            throw new Error(`Cannot create user ${err}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const query = `DELETE FROM users where id = ($1)`;
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot delete user of id ${id} ${err}`);
        }
    }
    async update(id, u) {
        try {
            const conn = await database_1.default.connect();
            const query = `UPDATE TABLE users set firstName= ($1), lastName = ($2),  email = ($3), password = ($4) where id = ${id} RETURNING *;`;
            const result = await conn.query(query, [u.firstName, u.lastName, u.email, u.password]);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot update user of id ${id} ${err}`);
        }
    }
}
exports.UserModel = UserModel;
