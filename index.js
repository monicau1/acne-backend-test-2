// index.js

const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "test-4688b.appspot.com", // Nama bucket Firebase Anda (tanpa gs://)
  databaseURL:
    "https://test-4688b-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const app = express();

const storage = new Storage({
  projectId: serviceAccount.project_id,
  credentials: {
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key.replace(/\\n/g, "\n"),
  },
});

const bucket = storage.bucket("test-4688b.appspot.com"); // Nama bucket Firebase Anda

app.use(bodyParser.json());

// Routes
const usersRoute = require("./routes/users");
const skinResultsRoute = require("./routes/skinResults");
const imagesRoute = require("./routes/images");
const acneDetectorRoute = require("./routes/acneDetector"); // Tambahkan route baru ini

// Gunakan routes
app.use("/api/users", usersRoute);
app.use("/api/skin-results", skinResultsRoute);
app.use("/api/images", imagesRoute);
app.use("/api/acne-detector", acneDetectorRoute); // Gunakan route baru ini

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
