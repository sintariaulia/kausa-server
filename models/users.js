const connection = require('../connection');
const bcrypt = require('bcrypt');

class userModels {
    static async getAllUsers() {
        const [rows] = await connection.execute('SELECT * FROM users');
        return rows;
    }

    static async getUserById(id) {
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async deleteUser(id) {
        await connection.execute('DELETE FROM users WHERE id = ?', [id]);
        return true;
    }

    static async updateUser(id, nama, no_hp) {
        const query = `UPDATE users SET nama = ?, no_hp = ? WHERE id = ?`;
        await connection.execute(query, [nama, no_hp, id]);
        return { id, nama, no_hp };
    }

    // Just Admin can use this create user
    static async createUser(nama, role, no_hp, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);   // Hash Password
        const [result] = await connection.execute(
            'INSERT INTO users (nama, role, no_hp, email, password) VALUES (?, ?, ?, ?, ?)',
            [nama, role, no_hp, email, hashedPassword]
        );

        const id = result.insertId;
        return { id, nama, role, no_hp, email, password };
    }

}

module.exports = userModels;