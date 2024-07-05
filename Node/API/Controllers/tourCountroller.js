const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`./routes/tours-simple.json`));
exports.GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'No tour found with that ID',
    });
  }
  const tour = tours.find((el) => el.id === id);
  console.log(tour);
  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

exports.UpdateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'No tour found with that ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.DeleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'No tour found with that ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.CreateTour = (req, res) => {
  exports.newId = tours[tours.length - 1].id + 1;
  exports.newTour = Object.assign({ id: newId }, req.body);
  // exports.newTour = { ...req.body, newId };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
