const mongoose = require('mongoose')
const express = require('express')
const Flat = mongoose.model('Flat')

const router = new express.Router()

router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById({ _id: req.params.id })
    if (!flat) return res.status(404).send('Not found')
    res.status(200).send(flat)
  } catch (error) {
    res.status(500).send()
  }
})

router.get('/', async (req, res) => {
  try {
    const flats = await Flat.find()
    res.status(200).send(flats)
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/', async (req, res) => {
  const { address, numOfRooms } = req.body

  const flat = new Flat({ address, numOfRooms })
  console.log(req.body)
  try {
    await flat.save()
    res.status(201).send(flat)
  } catch (error) {
    res.send(400, error)
  }
})

router.patch('/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['address', 'numOfRooms']
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) res.status(400).send({ error: 'Invaild Updates' })

  try {
    const flat = await Flat.findOne({ _id: req.params.id })
    if (!flat) return res.status(404).send('Not Found')

    updates.forEach((update) => (flat[update] = req.body[update]))
    await flat.save()

    res.status(200).send(flat)
  } catch (error) {
    res.status(500).send()
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const flat = await Flat.findOneAndDelete({ _id: req.params.id })
    if (!flat) return res.status(404).send('Not Found')
    res.send(flat)
  } catch (error) {
    res.status(500).send()
  }
})

module.exports = router
