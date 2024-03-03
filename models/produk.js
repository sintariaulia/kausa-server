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

    // Create Produk URL old
    static async createProduk(kategori_id, nama_produk, deskripsi, harga, gambar) {
        const query = `INSERT INTO produks (kategori_id, nama_produk, deskripsi, harga, gambar) 
        VALUES (?, ?, ?, ?, ?)`
        const [result] = await connection.execute(query, [kategori_id, nama_produk, deskripsi, harga, gambar]);
        const id = result.insertId;
        return { id, kategori_id, nama_produk, deskripsi, harga, gambar };
    }

    // Create produk upload gambar
    static async createProdukNew(kategori_id, nama_produk, deskripsi, harga, gambar) {
        try {
            const query = `INSERT INTO produks (kategori_id, nama_produk, deskripsi, harga, gambar) 
            VALUES (?, ?, ?, ?, ?)`;
            const [result] = await connection.execute(query, [kategori_id, nama_produk, deskripsi, harga, gambar]);

            if (result.affectedRows !== 1) {
                throw new Error('Failed to creating products')
            }

            const id = result.insertId;
            return { id, kategori_id, nama_produk, deskripsi, harga, gambar };
        } catch (error) {
            console.error('Error creating products:', error.message);
            throw error; // Rethrow the error for the calling function to handle
        }
    }

    static async updateProduk(id, nama_produk, deskripsi, harga, gambar) {
        try {
            const query = `UPDATE produks SET nama_produk = ?, deskripsi = ?, harga = ?, gambar = ? WHERE id = ?`;
            const [result] = await connection.execute(query, [nama_produk, deskripsi, harga, gambar, id]);

            if (result.affectedRows !== 1) {
                throw new Error('Failed to updating products')
            }
            
            return { id, nama_produk, deskripsi, harga, gambar };
        } catch (error) {
            console.error('Error updating products:', error.message);
            throw error; // Rethrow the error for the calling function to handle
        }
    }

    static async deleteProduk(id) {
        const query = 'DELETE FROM produks WHERE id = ?';
        await connection.execute(query, [id]);
        return true;
    }

}

module.exports = produkModels;