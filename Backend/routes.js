import { Router } from "express";
import { body, param } from "express-validator";
import { create, getAll, editProduct, deleteProduct } from "./Controller.js";

const routes = Router({ strict: true });

// Create Data
routes.post(
  "/create",
  [
    body("Merk", "Must not be empty.").trim().not().isEmpty().escape(),
    body("Jenis", "Must not be empty.").trim().not().isEmpty().escape(),
    body("Jumlah_stok", "Must not be empty.").trim().not().isEmpty().escape(),
    body("Harga", "Must not be empty.").trim().not().isEmpty().escape(),
    body("Keterangan", "Must not be empty.").trim().not().isEmpty().escape(),
  ],
  create
);
// Read All Data
routes.get("/product", getAll);
// Search (Not yet)
routes.get(
  "/post/:id",
  [param("id", "Invalid product ID.").exists().isNumeric().toInt()],
  getAll
);
// Update Data
routes.put(
  "/edit",
  [
    body("Id_Product", "Invalid post ID").isNumeric().toInt(),
    body("Merk", "Must not be empty.")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .escape(),
    body("Jenis", "Must not be empty.")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .escape(),
    body("Jumlah_Stok", "Must not be empty.")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .escape(),
    body("Harga", "Must not be empty.")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .escape(),
    body("Keterangan", "Must not be empty.")
      .optional()
      .trim()
      .not()
      .isEmpty()
      .escape(),
  ],
  editProduct
);
// Delete Data
routes.delete(
  "/delete",
  [
    body("Id_Product", "Please provide a valid post ID.")
      .exists()
      .isNumeric()
      .toInt(),
  ],
  deleteProduct
);

export default routes;
