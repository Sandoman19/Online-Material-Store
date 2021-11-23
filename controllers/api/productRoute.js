// importing express.router
const router = require("express").Router();
// importing models
const { Product } = require("../../models");

// GET of products
router.get("/", (req, res) => {});
// GET of products by id
router.get("/:id", (req, res) => {});
// POST of products
router.post("/", (req, res) => {});
//UPDATE of products
router.put("/:id", (req, res) => {});
// DELETE of products
router.delete("/:id", (req, res) => {});
// export
