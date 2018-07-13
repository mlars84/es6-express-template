import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    title: 'Hand written Express'
  });
});

export default router;
