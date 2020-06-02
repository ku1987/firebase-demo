const express = require('express');

const router = express.Router();
const { db } = require('../db-config');

const contentsRef = db.collection('contents');

const header = (res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST');
  res.set('Access-Control-Allow-Headers', 'Origin, Content Type, X-Requested-Width, Accept');
  res.set('Access-Control-Max-Age', '1296000');
};

router.get('/', (req, res) => {
  (async () => {
    header(res);
    try {
      const response = await contentsRef.limit(3).get();
      const { docs } = response;
      const data = docs.map((doc) => {
        const {
          id,
          contents,
          areaName,
          areaLevel,
          lat,
          lng,
        } = doc.data();
        return {
          id,
          contents,
          areaName,
          areaLevel,
          lat,
          lng,
        };
      });
      res.json({
        status: 'success',
        message: 'Currently limiting data within 3 matches.',
        data,
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: 'fail',
        data: 'Not found.',
      });
    }
  })();
});

router.get('/id/:id', (req, res) => {
  (async () => {
    header(res);
    const targetId = req.params.id;
    try {
      const snapshot = await (contentsRef.where('id', '==', targetId).get());
      const dataCollection = [];
      snapshot.forEach((doc) => {
        dataCollection.push(doc.data());
      });
      res.json({
        status: 'success',
        data: dataCollection[0],
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: 'fail',
        data: 'Not found.',
      });
    }
  })();
});

router.get('/area/:area', (req, res) => {
  (async () => {
    header(res);
    const targetArea = req.params.area;
    try {
      const snapshot = await (contentsRef.where('areaName', '==', targetArea).get());
      const dataCollection = [];
      snapshot.forEach((doc) => {
        dataCollection.push(doc.data());
      });
      res.json({
        status: 'success',
        data: dataCollection[0],
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: 'fail',
        data: 'Not found.',
      });
    }
  })();
});

router.get('/area-level/:areaLevel', (req, res) => {
  (async () => {
    header(res);
    const targetAreaLevel = req.params.areaLevel;
    try {
      const snapshot = await (contentsRef.where('areaLevel', '==', targetAreaLevel).get());
      const dataCollection = [];
      snapshot.forEach((doc) => {
        dataCollection.push(doc.data());
      });
      res.json({
        status: 'success',
        data: dataCollection,
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: 'fail',
        data: 'Not found.',
      });
    }
  })();
});

module.exports = router;
