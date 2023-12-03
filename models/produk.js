const connection = require("../connection");

class produkModels {
    static async getAllProduk() {
        const query = `
                SELECT p.id, p.kode_produk, k.nama_kategori kategori_id, p.nama_produk, p.deskripsi, p.harga, p.gambar 
                FROM produks p JOIN kategoris k ON p.kategori_id = k.id`;
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getProdukById(id) {
        const query = `
                SELECT p.id, p.kode_produk, k.nama_kategori kategori_id, p.nama_produk, p.deskripsi, p.harga, p.gambar 
                FROM produks p JOIN kategoris k ON p.kategori_id = k.id 
                WHERE p.id = ?`;
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async createProduk(kode_produk, kategori_id, nama_produk, deskripsi, harga, gambar) {
        const query = `INSERT INTO produks (kode_produk, kategori_id, nama_produk, deskripsi, harga, gambar) 
        VALUES (?, ?, ?, ?, ?, ?)`
        const [result] = await connection.execute(query, [kode_produk, kategori_id, nama_produk, deskripsi, harga, gambar]);
        const id = result.insertId;
        return { id, kode_produk, kategori_id, nama_produk, deskripsi, harga, gambar };
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