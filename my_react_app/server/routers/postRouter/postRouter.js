import express, { response } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';


const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  res.json({ok: true}).send()
})


router.get('/post', async (req, res) => {
  let data = await axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    if (response.status === 200) {
      return response.data
    }
  })
  res.json({ok: true, data: data}).send()
})


export default router;