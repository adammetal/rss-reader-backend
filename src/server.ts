import express from "express";
import cors from "cors";
import https from "node:https";
import { PassThrough } from "node:stream";

const RSS_TO_JSON_API = "https://rss-to-json-serverless-api.vercel.app/";

export const getFeed = (feedUrl: string) => {
  const url = new URL("api", RSS_TO_JSON_API);
  url.searchParams.append("feedURL", feedUrl);

  const os = new PassThrough();

  https
    .request(url, (res) => {
      res.pipe(os);
    })
    .end();

  return os;
};

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  const feedUrl = req.query.feedUrl?.toString() ?? "";
  return getFeed(feedUrl).pipe(res);
});

app.get("/hackernews", (req, res) => {
  return getFeed("https://hnrss.org/frontpage").pipe(res);
});

app.get('/devto', (req, res) => {
  return getFeed("https://dev.to/feed/").pipe(res);
});

export default app;
