const express = require("express");

const controllers = require("../controllers");

const routes = function () {
  const apiRoute = express.Router();

  const testController = controllers.testController();
  apiRoute.route("/test").post(testController);

  return apiRoute;
};

module.exports = routes;
