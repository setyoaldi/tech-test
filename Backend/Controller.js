import DB from "./database.js";

const create = async (req, res, next) => {
  const { merk, jenis, jumlah_stok, harga, keterangan } = req;
  try {
    const [result] = await DB.execute(
      "INSERT INTO `product` (`Merk`,`Jenis`,`Jumlah_Stok`,`Harga`,`Keterangan`) VALUES (?,?,?,?,?)",
      [merk, jenis, jumlah_stok, harga, keterangan]
    );
    res.status(201).json({
      ok: 1,
      status: 201,
      message: "Product has been created successfully",
      Id_Product: result.insertId,
    });
  } catch (e) {
    next(e);
  }
};
const getAll = async (req, res, next) => {
  try {
    let sql = "SELECT * FROM `product`";
    if (req.params.id) {
      sql = `SELECT * FROM product WHERE id=${req.params.id}`;
    }
    const [row] = await DB.query(sql);
    if (row.length === 0 && req.params.id) {
      return res.status(404).json({
        ok: 0,
        status: 404,
        message: "Invalid Product ID.",
      });
    }
    const product = req.params.id ? { product: row[0] } : { product: row };
    res.status(200).json({
      ok: 1,
      status: 200,
      ...product,
    });
  } catch (e) {
    next(e);
  }
};
const editProduct = async (req, res, next) => {
  try {
    const data = req;
    const [row] = await DB.query("SELECT * FROM `product` WHERE `id`=?", [
      data.Id_Product,
    ]);

    if (row.length !== 1) {
      return res.json({
        ok: 0,
        statu: 404,
        message: "Invalid product ID.",
      });
    }
    const product = row[0];
    const merk = data.merk || product.merk;
    const jenis = data.jenis || product.jenis;
    const jumlah_stok = data.jumlah_stok || product.jumlah_stok;
    const harga = data.harga || product.harga;
    const keterangan = data.keterangan || product.keterangan;
    await DB.execute(
      "UPDATE `product` SET `Merk`=?, `Jenis`=?,`Jumlah_Stok`=?, `Harga`=?, `Keterangan`=? WHERE `id`=?",
      [merk, jenis, jumlah_stok, harga, keterangan, data.Id_Product]
    );
    res.json({
      ok: 1,
      status: 200,
      message: "Product Updated Successfully",
    });
  } catch (e) {
    next(e);
  }
};
const deleteProduct = async (req, res, next) => {
  try {
    const [result] = await DB.execute("DELETE FROM `product` WHERE `id`=?", [
      req.body.Id_Product,
    ]);
    if (result.affectedRows) {
      return res.json({
        ok: 1,
        status: 200,
        message: "Product has been deleted successfully.",
      });
    }
    res.status(404).json({
      ok: 0,
      status: 404,
      message: "Invalid Product ID.",
    });
  } catch (e) {
    next(e);
  }
};
export { create, getAll, editProduct, deleteProduct };
