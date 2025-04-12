/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
const functions = require('firebase-functions');
const { Resend } = require('resend');

const resend = new Resend(functions.config().resend.api_key);
// const resend = new Resend('re_bFmeCfVA_57f7XG3BopBxtUG6J3QtoW5n'); // 👈 Just keeping API key here

exports.sendKycNotification = functions.firestore
  .document('kycRequests/{docId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();

    try {
      const response = await resend.emails.send({
        from: 'Market Trybe <onboarding@resend.dev>', // You can use this default sender at first
        to: ['trybenode@gmail.com', 'ezekieleyitayo2020@gmail.com'], // 👈 Add multiple if needed
        subject: 'New KYC Form Submitted',
        html: `
          <h3>New KYC Submission Received</h3>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Matric Number:</strong> ${data.matricNumber}</p>
          <p><strong>Front ID:</strong> <a href="${data.frontID}">View</a></p>
          <p><strong>Back ID:</strong> <a href="${data.backID}">View</a></p>
        `,
      });

      console.log('Email sent:', response);
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  });
