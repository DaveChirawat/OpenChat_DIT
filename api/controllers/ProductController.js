const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/create', async (req, res) => {
  try {
    await prisma.product.create({
      data: req.body,
    });

    res.send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get('/list', async (req, res) => {
  try {
    const data = await prisma.product.findMany({
      orderBy: {
        id: 'desc'
      }, where: {
        status: 'use'
      }
    })
    res.send({ results: data });
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

router.delete('/remove/:id', async (req, res) => {
  try {
    await prisma.product.update({
      data: {
        status: 'delete'
      },
      where: {
        id: parseInt(req.params.id)
      }

    })
    res.send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

router.put('/update', async (req, res) => {
  try {
    await prisma.product.update({
      data:req.body,
      where: {
        id: parseInt(req.body.id)
      }
    })
    res.send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

module.exports = router;
