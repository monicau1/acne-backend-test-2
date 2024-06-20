// routes/acneDetector.js

const express = require('express');
const router = express.Router();
const multer = require('multer');

// Middleware untuk menangani unggahan file dengan Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // Batas ukuran file 15 MB
  }
});

// Controllers
const {
  getAcneDetector,
  uploadAcneDetector,
  deleteAcneDetector
} = require('../controllers/acneDetectorController');

// Routes untuk acne_detector.tflite
router.get('/', getAcneDetector);
router.post('/', upload.single('file'), uploadAcneDetector); // Memastikan upload.single('file') ditambahkan di sini
router.delete('/', deleteAcneDetector);

module.exports = router;
