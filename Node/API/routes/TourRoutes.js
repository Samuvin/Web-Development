const express = require('express');
const Router = express.Router();
const {
  GetAllTours,
  CreateTour,
  getTour,
  UpdateTour,
  DeleteTour,
} = require('../Controllers/tourController');

// Router.param('id', checkId);

Router.route('/').get(GetAllTours).post(CreateTour);
Router.route('/:id').get(getTour).patch(UpdateTour).delete(DeleteTour);

module.exports = Router;
