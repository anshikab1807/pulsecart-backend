import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Fix Windows path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

// Check if running in production (Render) with environment variables
if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  // Use environment variables
  serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  };
  console.log("Using Firebase credentials from environment variables");
} else {
  // Use local service account file
  const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
  
  if (!fs.existsSync(serviceAccountPath)) {
    console.error("serviceAccountKey.json not found at", serviceAccountPath);
    console.error("Please provide Firebase credentials via environment variables or add serviceAccountKey.json");
    process.exit(1);
  }
  
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
  console.log("Using Firebase credentials from serviceAccountKey.json");
}

// Initialize Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

// Export named adminAuth for use in controllers
export const adminAuth = getAuth();