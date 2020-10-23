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

module.exports = review
