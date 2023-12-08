const connection = require('../connection');

class aboutusModels {
    static async getAllAboutUs() {
        const [rows] = await connection.execute('SELECT * FROM aboutus');
        return rows;
    }

    static async createAboutUs(title, story, gambar) {
        const [result] = await connection.execute('INSERT INTO aboutus (title, story, gambar) VALUES (?, ?, ?)', [title, story, gambar]);
        const id = result.insertId;
        return { id, title, story, gambar };
    }

    static async updateAboutUs(id, title, story, gambar) {
        await connection.execute('UPDATE aboutus SET title = ?, story = ?, gambar = ? WHERE id = ?', [title, story, gambar, id]);
        return { id, title, story, gambar };
    }

    static async deleteAboutUs(id) {
        await connection.execute('DELETE FROM aboutus WHERE id = ?', [id]);
        return true;
    }

}

module.exports = aboutusModels