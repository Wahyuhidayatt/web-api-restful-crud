'use strict'

const memo = require('../models/memo')
const slug = require('slug')

let methods = {}

methods.create= (req, res, next) => {
  memo.create({
    title: req.body.title,
    content: req.body.content,
    slug: slug(req.body.title).toLowerCase()
  })
    .then((memo) => {
      res.send({
        message: 'SUCCSESS CREATE MEMO!',
        memo: memo
      })
    })
    .catch((error) => {
      res.send({
        error: error
      })
    })
}

methods.getAll = (req, res, next) => {
  memo.find()
    .then((memos) => {
      res.send({
        memo: memos
      })
    })
    .catch((error) => {
      res.send({
        error: error
      })
    })
}

methods.getOne = (req, res) => {
  memo.findOne({
    slug: req.params.slug
  })
    .then((memo) => {
      res.send(memo)
    })
    .catch((error) => {
      res.send(error)
    })
}

methods.update = (req, res, next) => {
  memo.findOne({
    slug: req.params.slug
  })
    .then((memo) => {
      if (!memo) {
        res.send({
          memoUndefined: 'Memo is not found!'
        })
      } else {
        memo.update({
          title: req.body.title,
          content: req.body.content,
          slug: slug(req.body.title).toLowerCase()
        })
          .then(() => {
            res.send({
              message: `Memo title ${memo.title} has been updated!`,
              memo: memo
            })
          })
          .catch((error) => {
            res.send({
              message: 'Memo failed to update!',
              error: error
            })
          })
      }
    }).catch((error) => {
      res.send({
        message: 'Error find one',
        error: error
      })
    })
}

methods.delete = (req, res, next) => {
  memo.findOne({
    slug: req.params.slug
  })
    .then((memo) => {
      if (!memo) {
        res.send({
          memoUndefined: 'Memo is not found!'
        })
      } else {
        memo.remove(memo)
          .then((memo) => {
            res.send({
              message: `${memo.title} has been deleted`
            })
          })
          .catch((error) => {
            res.send({
              message: 'Memo failed to delete!',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.send({
        message: 'Error find one',
        error: error
      })
    })
}

module.exports = methods
