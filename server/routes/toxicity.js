const express = require('express');
const toxicity = require('@tensorflow-models/toxicity');
const History = require('../models/History');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

const threshold = 0.9;


/**
 * @swagger
 * /classify:
 *   post:
 *     summary: Classify text for toxicity
 *     description: Analyze the provided text for toxicity using a pre-trained model and save the results in the user's history.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "This is a sample text to analyze."
 *     responses:
 *       200:
 *         description: The toxicity predictions for the provided text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 predictions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "identity_attack"
 *                       results:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             match:
 *                               type: boolean
 *                               example: false
 *                             probabilities:
 *                               type: array
 *                               items:
 *                                 type: number
 *                               example: [0.1, 0.2, 0.3]
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       400:
 *         description: Bad request, possibly due to missing text parameter
 */

router.post('/classify', authenticate, async (req, res) => {
  const { text } = req.body;
  const model = await toxicity.load(threshold);
  const predictions = await model.classify([text]);
  const history = new History({ userId: req.user.id, text, predictions });
  await history.save();
  res.json({ predictions });
});



/**
 * @swagger
 * /history:
 *   get:
 *     summary: Retrieve user history
 *     description: Get the list of classified texts and their predictions from the user's history.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of user's classified texts and predictions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "605c72efc29f1c001f647d3e"
 *                   userId:
 *                     type: string
 *                     example: "605c72efc29f1c001f647d3d"
 *                   text:
 *                     type: string
 *                     example: "Sample text for history"
 *                   predictions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         label:
 *                           type: string
 *                           example: "identity_attack"
 *                         results:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               match:
 *                                 type: boolean
 *                                 example: false
 *                               probabilities:
 *                                 type: array
 *                                 items:
 *                                   type: number
 *                                 example: [0.1, 0.2, 0.3]
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

router.get('/history', authenticate, async (req, res) => {
  const history = await History.find({ userId: req.user.id });
  res.send(history);
});



/**
 * @swagger
 * /history/{id}:
 *   get:
 *     summary: Retrieve a specific history item
 *     description: Get the classified text and its predictions for a specific history item.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the history item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The specified history item and its predictions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "605c72efc29f1c001f647d3e"
 *                 userId:
 *                   type: string
 *                   example: "605c72efc29f1c001f647d3d"
 *                 text:
 *                   type: string
 *                   example: "Sample text for history"
 *                 predictions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       label:
 *                         type: string
 *                         example: "identity_attack"
 *                       results:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             match:
 *                               type: boolean
 *                               example: false
 *                             probabilities:
 *                               type: array
 *                               items:
 *                                 type: number
 *                               example: [0.1, 0.2, 0.3]
 *       404:
 *         description: History item not found
 *       401:
 *         description: Unauthorized, invalid or missing token
 */

router.get('/history/:id', authenticate, async (req, res) => {
  try {
    const historyItem = await History.findById(req.params.id);
    if (!historyItem || historyItem.userId.toString() !== req.user.id) {
      return res.status(404).send('History item not found.');
    }
    res.send(historyItem);
  } catch (err) {
    res.status(500).send('Server error.');
  }
});


module.exports = router;
