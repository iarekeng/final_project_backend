const express = require('express')
const review = express.Router()
const Review = require('../models/review')


// INDEX ROUTE
review.get('/', (req, res) => {
  Review.find({}, (err, foundReview) => {
    res.json(foundReview)
  })
})

// CREATE ROUTE
review.post('/', (req, res) => {
  Review.create(req.body, (err, createdReview) => {
    Review.find({}, (err, foundReview) => {
      res.json(foundReview)
    })
  })
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
