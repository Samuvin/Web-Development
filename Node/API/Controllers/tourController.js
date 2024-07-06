const Tour = require('./../Model/tourModel');
// const fs = require('fs');
// const tours = JSON.parse(fs.readFileSync(`./routes/tours-simple.json`));

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'failed',
//       data: 'null',
//       message: 'Missing name or Price',
//     });
//   }
//   next();
// };

exports.GetAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // result: tours.length,
    // data: { tours },
  });
};

exports.getTour = (req, res) => {
  // const tour = tours.find((el) => el.id === req.params.id * 1);
  res.status(200).json({
    status: 'success',
    // data: { tour },
  });
};

exports.UpdateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.DeleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.CreateTour = async (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // exports.newTour = { ...req.body, newId };
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   },
  // );
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};
