const express = require("express");
const router = express.Router();
const { postsController, reviewPostsController, detailPostsController } = require("../controllers");
const paramsValidators = require("../utils/paramsValidators");
const _ = require("lodash");
const moment = require("moment");

router.get("/get", async (req, res, next) => {
  try {
    const params = req.query;
    params.isDeleted = false
    const checkParam = await paramsValidators(params, ["id"]);
    if (!checkParam) {
      console.log("err");
      throw "Insert all inputs.";
    }
    const postCtrl = new postsController(params);
    const posts = await postCtrl.get();

    posts["alert"] = posts.createdAt >= moment().subtract(7, 'days').toISOString()
    if (_.isEmpty(posts)) {
      throw "The post doesn't found.";
    }
    res.send({ posts });
  } catch (error) {
    res.send(error);
  }
});

router.get("/getAll", async (req, res, next) => {
  try {
    const params = req.query;
    params.isDeleted = false
    const postCtrl = new postsController(params);
    const posts = await postCtrl.getAll();

    posts.map((data)=>{
      data["alert"] = data.createdAt >= moment().subtract(7, 'days').toISOString()
    })

    if (_.isEmpty(posts)) {
      throw "Any post found.";
    }
    res.send( posts );
  } catch (error) {
    res.send(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["title","description","idUser"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }

    const postCtrl = new postsController(params);
    const posts = await postCtrl.create();

    const detailPostsCtrl = new detailPostsController({idUser:params.idUser,idPost: posts.id, type: "create"});
    const detailPosts = await detailPostsCtrl.create();

    if (_.isEmpty(posts)) {
      throw "Something wrong creating the post.";
    }
    res.send({ posts });
  } catch (error) {
    res.send(error);
  }
});

router.post("/review", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["idPost","score","comments"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    }

    const reviewPostsCtrl = new reviewPostsController(params);
    const reviewPosts = await reviewPostsCtrl.create();
    if (_.isEmpty(reviewPosts)) {
      throw "Something wrong creating the review.";
    }
    res.send({ reviewPosts });
  } catch (error) {
    res.send(error);
  }
});

router.put("/update", async (req, res, next) => {
  try {
    const params = req.body;
    const checkParams = await paramsValidators(params, ["title","description","idUser"]);
    if (!checkParams) {
      console.log("err");
      throw "Insert all inputs.";
    } 

    const postCtrl = new postsController(params);
    const posts = await postCtrl.update();

    const detailPostsCtrl = new detailPostsController({idUser:params.idUser,idPost: posts.id, type: "update"});
    const detailPosts = await detailPostsCtrl.create();

    if (_.isEmpty(posts)) {
      throw "Something wrong updating the post.";
    }
    res.send({ posts });
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
    let postCtrl = new postsController(params);
    let posts = await postCtrl.get();
    if (_.isEmpty(posts)) {
      throw "The post doesn't exist.";
    }
    //posts = await postCtrl.delete();
    params.isDeleted = true
    postCtrl = new postsController(params);
    posts = await postCtrl.update();

    const detailPostsCtrl = new detailPostsController({idUser:params.idUser,idPost: posts.id, type: "delete"});
    const detailPosts = await detailPostsCtrl.create();

    res.send({ posts });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
