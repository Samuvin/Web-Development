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

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const querObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete querObj[field]);

    let queryStr = JSON.stringify(querObj);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    );

    this.query = this.query.find(queryStr);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortby = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortby);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limit_fields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pagination() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 100;
    let skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,Price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

exports.GetAllTours = async (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   result: tours.length,
  // data: { tours },
  // });
  try {
    // const querObj = { ...req.query };
    // const exculedFields = ['page', 'sort', 'limit', 'fields'];
    // exculedFields.forEach((field) => delete querObj[field]);

    // let query = JSON.stringify(querObj);
    // query = JSON.parse(
    //   query.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`),
    // );
    // let queryres = Tour.find(query);

    // if (req.query.sort) {
    //   const sortby = req.query.sort.split(',').join(' ');
    //   queryres = queryres.sort(sortby);
    // } else {
    //   queryres = queryres.sort('-createdAt');
    // }

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   queryres = queryres.select(fields);
    // } else {
    //   queryres = queryres.select('-__v');
    // }
    // let page = req.query.page * 1 || 1;
    // let limit = req.query.limit * 1 || 100;
    // let skip = (page - 1) * limit;

    // queryres = queryres.skip(skip).limit(limit);
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (page > Math.ceil(numTours / limit)) {
    //     throw new Error('Page limit exceeded');
    //   }
    // }
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limit_fields()
      .pagination();
    const Tours = await features.query;
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');
    res.status(200).json({
      status: 'success',
      data: {
        Tours: Tours,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // const tour = tours.find((el) => el.id === req.params.id * 1);
  // res.status(200).json({
  //   status: 'success',
  //    data: { tour },
  // });
  try {
    const data = await Tour.findOne({ _id: req.params._id });
    res.status(200).json({
      status: 'success',
      data: {
        tour: data,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.UpdateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: err,
    });
  }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<Updated tour here...>',
  //   },
  // });
};

exports.DeleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: 'null',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
  // res.status(204).json({
  //   status: 'success',
  //   data: null,
  // });
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
      message: err,
    });
  }
};
