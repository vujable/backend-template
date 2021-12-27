const express = require("express");

const controllers = require("../controllers");

const routes = function () {
  const apiRoute = express.Router();

  const pingController = controllers.pingController();
  apiRoute.route("/ping").post(pingController.ping);

  return apiRoute;
};

module.exports = routes;
