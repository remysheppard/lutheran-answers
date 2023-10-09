/*/ Grab Environment Variables
const merch_secret = process.env.MERCH_SECRET;
const app_id = process.env.APP_ID;
const token = process.env.ACCESS_TOKEN;

const { stream } = require("@netlify/functions");

exports.handler = stream(async (event) => {

  // The response body returned from "fetch" is a "ReadableStream",
  // so you can return it directly in your streaming response
  const res = await fetch("https://api.gumroad.com/v2/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Set this environment variable to your own key
      Authorization: `Bearer ${token}`,
    },
    body: JSON;

  return {
    headers: {
      // This is the mimetype for server-sent events
      "content-type": "text/event-stream",
    },
    statusCode: 200,
    // Pipe the event stream from OpenAI to the client
    body: res.body,
  };
});*/