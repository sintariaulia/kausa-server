const connection = require('../connection');

class pesananModels {
    static async getAllPesanans() {
        const query = `
            SELECT o.id, u.nama user_id, p.nama_produk produk_id, o.quantity, o.waktu_pickup, o.total_harga, o.status_pesanan, o.created_at
            FROM pesanans o
            JOIN users u ON o.user_id = u.id
            JOIN produks p ON o.produk_id = p.id
            ORDER BY o.created_at DESC`;
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getPesananById(id) {
        const query = `
        SELECT o.id, u.nama user_id, p.nama_produk produk_id, o.quantity, o.waktu_pickup, o.total_harga, o.status_pesanan, o.created_at
        FROM pesanans o
        JOIN users u ON o.user_id = u.id
        JOIN produks p ON o.produk_id = p.id
        WHERE o.id = ?
        ORDER BY o.created_at DESC`;
        const [rows] = await connection.execute(query, [id]);
        return rows[0];
    }

    static async getPesananByUser(user_id) {
        const query = `
        SELECT o.id, u.nama user_id, p.nama_produk produk_id, o.quantity, o.waktu_pickup, o.total_harga, o.status_pesanan, o.created_at
        FROM pesanans o
        JOIN users u ON o.user_id = u.id
        JOIN produks p ON o.produk_id = p.id
        WHERE o.user_id = ?
        ORDER BY o.created_at DESC`;
        const [rows] = await connection.execute(query, [user_id]);
        return rows;
    }

    static async createPesanan(user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan) {
        const query = `
        INSERT INTO pesanans (user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan) 
        VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await connection.execute(query, [user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan]);
        const id = result.insertId;
        return { id, user_id, produk_id, quantity, waktu_pickup, total_harga, status_pesanan };
    }

    static async updatePesanan(id, status_pesanan) {
        const query = `UPDATE pesanans SET status_pesanan = ? WHERE id = ?`;
        await connection.execute(query, [status_pesanan, id]);
        return { id, status_pesanan };
    }

    static async deletePesanan(id) {
        const query = 'DELETE FROM pesanans WHERE id = ?';
        await connection.execute(query, [id]);
        return true;
    }

}

module.exports = pesananModels;