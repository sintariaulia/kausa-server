const connection = require('../connection');

class paymentModels {
    static async getAllPayments() {
        const query = `SELECT p.id, o.id pesanan_id, p.bukti_bayar, p.status, p.created_at
        FROM payments p JOIN pesanans o ON p.pesanan_id = o.id
        ORDER BY p.created_at DESC`;
        const [rows] = await connection.execute(query);
        return rows;
    }

    static async getPaymentById(id) {
        const query = `SELECT p.id, o.id pesanan_id, p.bukti_bayar, p.status, p.created_at
        FROM payments p JOIN pesanans o ON p.pesanan_id = o.id
        WHERE p.id = ?
        ORDER BY p.created_at DESC`;
        const [rows] = await connection.execute(query, [id]);
        return rows;
    }

    static async getPaymentByPesananId(pesananId) {
        const query = `SELECT p.id, o.id pesanan_id, p.bukti_bayar, p.status, p.created_at
      FROM payments p JOIN pesanans o ON p.pesanan_id = o.id
      WHERE o.id = ?
      ORDER BY p.created_at DESC`;
        const [rows] = await connection.execute(query, [pesananId]);
        return rows;
    }

    // static async createPayment(pesanan_id, bukti_bayar, status) {
    //     const query = `INSERT INTO payments (pesanan_id, bukti_bayar, status) VALUES (?, ?, ?)`;
    //     const [result] = await connection.query(query, [pesanan_id, bukti_bayar, status]);
    //     const id = result.insertId;
    //     return { id, pesanan_id, bukti_bayar, status }
    // }

    static async createPayment(pesanan_id, bukti_bayar, status) {
        try {
            const query = 'INSERT INTO payments (pesanan_id, bukti_bayar, status) VALUES (?, ?, ?)';
            const [result] = await connection.query(query, [pesanan_id, bukti_bayar, status]);

            if (result.affectedRows !== 1) {
                throw new Error('Failed to insert payment');
            }

            const id = result.insertId;
            return { id, pesanan_id, bukti_bayar, status };
        } catch (error) {
            console.error('Error creating payment:', error.message);
            throw error; // Rethrow the error for the calling function to handle
        }
    }

    static async updatePayment(id, status) {
        const query = `UPDATE payments SET status = ? WHERE id = ?`;
        await connection.execute(query, [status, id]);
        return { id, status };
    }

    static async deletePayments(id) {
        const query = 'DELETE FROM payments WHERE id = ?';
        await connection.execute(query, [id]);
        return true;
    }
}

module.exports = paymentModels;