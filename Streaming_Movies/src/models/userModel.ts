import client from "../database";
import bcrypt from "bcrypt";

export type User = {
  id?: number;
  firstName: string;
  secondName: string;
  email: string;
  password: string;
};

export type userUpdate = {
  firstName: string | null;
  secondName: string | null;
  email?: string | null;
  password?: string | null;
};

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM users;`;
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`);
    }
  }

  async show(id: number): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = `SELECT * FROM users where id = ($1);`;
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get movie of id ${id} ${err}`);
    }
  }
  async create(u: User): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const conn = await client.connect();
      const query = `INSERT INTO users (firstName, secondName, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`;
      await conn.query(query, [u.firstName, u.secondName, u.email, hashedPassword]);
      conn.release();
    } catch (err) {
      throw new Error(`Cannot create user ${err}`);
    }
  }
  async delete(id: number): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = `DELETE FROM users where id = ($1)`;
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot delete user of id ${id} ${err}`);
    }
  }
  async update(id: number, u: userUpdate): Promise<User[]> {
    try {
      const conn = await client.connect();
      const query = `UPDATE TABLE users set firstName= ($1), secondName= ($2),  email= ($3), password= ($4) where id = ${id} RETURNING *;`;
      const result = await conn.query(query, [u.firstName, u.secondName, u.email, u.password]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot update user of id ${id} ${err}`);
    }
  }
}
