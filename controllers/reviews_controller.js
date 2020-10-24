const review = require('express').Router()
const Review = require('../models/review')


// INDEX ROUTE
review.get('/', (req, res) => {
  Review.find({}, (err, foundReview) => {
    res.json(foundReview)
  })
})

review.get('/:id', async (req, res) => {
  const singlereview = await Review.findById(req.params.id);
  res.json(singlereview)
})

// CREATE ROUTE

review.post('/', async (req, res) => {
  const { title, name, date, comment } = req.body;

  const newReview = new Review({
    title,
    name,
    date,
    comment
  })
  try {
    const savedReview = await newReview.save();
    res.json(savedReview)
  } catch(err) {
      console.error(err);
    }
})



// UPDATE ROUTE
review.put('/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedReview) => {
    Review.find({}, (err, foundReview) => {
      res.json(foundReview)
    })
  })
})

// DELETE ROUTE
review.delete('/:id', (req, res) => {
  Review.findByIdAndRemove(req.params.id, (err, deletedReview) => {
    Review.find({}, (err, foundReview) => {
      res.json(foundReview)
    })
  })
})

module.exports = review
