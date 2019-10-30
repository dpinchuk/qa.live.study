const express = require("express");

module.exports = Collection => {
  // ======
  // Create
  // ======
  const create = (req, res) => {
    const newEntry = req.body;
    Collection.create(newEntry, (e, newEntry) => {
      if (e) {
        console.log(e);
        res.sendStatus(500);
      } else {
        res.send(newEntry);
      }
    });
  };

  // =========
  // Read many
  // =========
  const readMany = (req, res) => {
    let query = res.locals.query || {};
    Collection.find(query, { password: 0 }, (e, result) => {
      if (e) {
        res.status(500).send(e);
        console.error(e.message);
      } else {
        res.json({ success: true, result: result });
      }
    });
  };

  // ========
  // Read one
  // ========
  const readOne = (req, res) => {
    const { _id } = req.params;
    Collection.findById(_id, { password: 0 }, (e, result) => {
      if (e) {
        res.status(500).send(e);
        console.log(e.message);
      } else {
        res.send(result);
      }
    });
  };

  // ======
  // Update
  // ======
  const update = (req, res) => {
    let changedEntry = req.body;
    changedEntry.updatedAt = Date.now();
    Collection.findByIdAndUpdate(
      { _id: req.params._id },
      { $set: changedEntry },
      { new: true },
      (e, doc) => {
        if (e) res.sendStatus(500);
        else res.json({ success: true, data: doc });
      }
    );
  };

  // ======
  // Remove
  // ======
  const remove = (req, res) => {
    Collection.remove({ _id: req.params._id }, e => {
      if (e) res.status(500).send(e);
      else res.sendStatus(200);
    });
  };

  // ======
  // Routes
  // ======

  let router = express.Router();

  router.post("/", create);
  router.get("/", readMany);
  router.get("/:_id", readOne);
  router.put("/:_id", update);
  router.delete("/:_id", remove);

  return router;
};
