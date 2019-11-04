const router = require('express').Router();

router.get('/api/test', (req, res) => {
  res.send('test string');
});

module.exports = router;