const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers");
const paramsValidators = require("../utils/paramsValidators");
const passwordValidators = require("../utils/passwordValidators");
const _ = require("lodash");

router.post("/auth", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["username","password"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }

    const userCtrl = new usersController({username:params.username});
    const users = await userCtrl.get();
    if (_.isEmpty(users)) {
      throw "User doesn't exist.";
    }

    if(passwordValidators.comparePassword(params.password,users.password))
      res.send({ auth: true });
    else
      throw "User and password are incorrect.";

  } catch (error) {
    res.send(error);
  }
});

router.get("/get", async (req, res, next) => {
  try {
    const params = req.query;
    const checkParam = await paramsValidators(params, ["id"]);
    if (!checkParam) {
      console.log("err");
      throw "Insert all inputs.";
    }
    const userCtrl = new usersController(params);
    const users = await userCtrl.get();
    if (_.isEmpty(users)) {
      throw "The user doesn't found.";
    }
    res.send({ users });
  } catch (error) {
    res.send(error);
  }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const params = req.query;

    const userCtrl = new usersController(params);
    const users = await userCtrl.getAll();

    if (_.isEmpty(users)) {
      throw "Any user found.";
    }
    res.send({ users });
  } catch (error) {
    res.send(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["name","username","type","password"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }

    params.password = passwordValidators.createPassword(params.password);

    const userCtrl = new usersController(params);
    const users = await userCtrl.create();
    if (_.isEmpty(users)) {
      throw "Something wrong creating the user.";
    }
    res.send({ users });
  } catch (error) {
    res.send(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["name","username","type"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }

    if(params.password)
      params.password = passwordValidators.createPassword(params.password);

    const userCtrl = new usersController(params);
    const users = await userCtrl.update();
    if (_.isEmpty(users)) {
      throw "Something wrong updating the user.";
    }
    res.send({ users });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["id"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }
    const userCtrl = new usersController(params);
    let users = await userCtrl.get();
    if (_.isEmpty(users)) {
      throw "The user doesn't exist.";
    }
    users = await userCtrl.delete();
    res.send({ users });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
