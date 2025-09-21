import Twilio from "twilio";
import dotenv from 'dotenv';

dotenv.config();

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send OTP
export const sendOTPbyPhone = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
  const message = await twilioClient.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });
  console.log({
    sid: message.sid,
    status: message.status,
    to: message.to,
    from: message.from,
    body: message.body
  });

  return otp;
};


// Function to verify OTP
export const verifyOTPbyPhone = async (phone, otp) => {
  // Implement your OTP verification logic here
  if (!phone || !otp) {
    throw new Error('Phone number and OTP are required');
  } 
  return true; // Placeholder
};
