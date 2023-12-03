const connection = require('../connection');
const bcrypt = require('bcrypt');

class authUserModels {
    static async createUser(nama, role, no_hp, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);   // Hash Password
        const [result] = await connection.execute('INSERT INTO users (nama, role, no_hp, email, password) VALUES (?, ?, ?, ?, ?)', [
            nama, 
            role, 
            no_hp, 
            email, 
            hashedPassword,
        ]);
        const id = result.insertId;
        return { id, nama, role, no_hp, email, password };
    }

    static async getUserByEmail(email) {
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

};

module.exports = authUserModels;