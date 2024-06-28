const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/create', async (req, res) => {
  try {
    await prisma.openchat.create({
      data: req.body,
    });

    res.send({ message: 'success' })
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

router.get('/list1', async (req, res) => {
  try {
      const employees = await prisma.employee.findMany();
      const openchats = await prisma.openchat.findMany();
      const result = employees.map(emp => {
          const openchat = openchats.find(chat => chat.empcode === emp.empcode);
          return { 
              ...emp, 
              openchat: openchat ? openchat : { empcode: null, status: null, modified_by: null, modified_date: null }
          };
      });

      res.send({ results: result });
      
  } catch (e) {
      res.status(500).send({ error: e.message });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const {modified_by} = req.body;
    await prisma.openchat.update({
      data: {
        status: 0,
        modified_by: modified_by
      },
      where: {
        empcode: req.params.id
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
