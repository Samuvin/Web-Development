const express = require('express');
const Router = express.Router();
const {
  GetAllTours,
  CreateTour,
  getTour,
  UpdateTour,
  aliasTopTours,
  DeleteTour,
} = require('../Controllers/tourController');

Router.route('/top-5-cheap').get(aliasTopTours, GetAllTours);

// Router.param('id', checkId);

Router.route('/').get(GetAllTours).post(CreateTour);
Router.route('/:id').get(getTour).patch(UpdateTour).delete(DeleteTour);

module.exports = Router;
