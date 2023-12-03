const connection = require('../connection');

class kategoriModels {
    static async getAllKategori() {
        const [rows] = await connection.execute('SELECT * FROM kategoris');
        return rows;
    }

    static async getKategoriById(id) {
        const [rows] = await connection.execute('SELECT * FROM kategoris WHERE id = ?', [id]);
        return rows[0];
    }

    static async createKategori(namaKategori) {
        const [result] = await connection.execute('INSERT INTO kategoris (nama_kategori) VALUES (?)', [namaKategori]);
        const id = result.insertId;
        return { id, namaKategori };
    }

    static async updateKategori(id, nama_kategori) {
        await connection.execute('UPDATE kategoris SET nama_kategori = ? WHERE id = ?', [nama_kategori, id]);
        return { id, nama_kategori };
    }

    static async deleteKategori(id) {
        await connection.execute('DELETE FROM kategoris WHERE id = ?', [id]);
        return true;
    }

}

module.exports = kategoriModels