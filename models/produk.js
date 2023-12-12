const connection = require("../connection");

class produkModels {
    static async getAllProduk() {
        const query = `
                SELECT p.id, k.nama_kategori kategori_id, p.nama_produk, p.deskripsi, p.harga, p.gambar 
                FROM produks p JOIN kategoris k ON p.kategori_id = k.id`;
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getProdukById(id) {
        const query = `
                SELECT p.id, k.nama_kategori kategori_id, p.nama_produk, p.deskripsi, p.harga, p.gambar 
                FROM produks p JOIN kategoris k ON p.kategori_id = k.id 
                WHERE p.id = ?`;
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async getProdukByKategori(nama_kategori) {
        const query = `
            SELECT p.id, k.nama_kategori, p.nama_produk, p.deskripsi, p.harga, p.gambar 
            FROM produks p JOIN kategoris k ON p.kategori_id = k.id 
            WHERE k.nama_kategori = ?`;
        const [rows] = await connection.execute(query, [nama_kategori]);
        return rows;
    }

    static async createProduk(kategori_id, nama_produk, deskripsi, harga, gambar) {
        const query = `INSERT INTO produks (kategori_id, nama_produk, deskripsi, harga, gambar) 
        VALUES (?, ?, ?, ?, ?)`
        const [result] = await connection.execute(query, [kategori_id, nama_produk, deskripsi, harga, gambar]);
        const id = result.insertId;
        return { id, kategori_id, nama_produk, deskripsi, harga, gambar };
    }

    static async updateProduk(id, nama_produk, deskripsi, harga, gambar) {
        const query = `UPDATE produks SET nama_produk = ?, deskripsi = ?, harga = ?, gambar = ? WHERE id = ?`;
        await connection.execute(query, [nama_produk, deskripsi, harga, gambar, id]);
        return { id, nama_produk, deskripsi, harga, gambar };
    }

    static async deleteProduk(id) {
        const query = 'DELETE FROM produks WHERE id = ?';
        await connection.execute(query, [id]);
        return true;
    }

}

module.exports = produkModels;