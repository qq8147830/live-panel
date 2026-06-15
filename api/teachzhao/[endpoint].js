import { handleApiRequest } from "../../teachzhao/lib/api-handlers.js";

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export default function handler(req, res) {
  const endpoint = Array.isArray(req.query.endpoint) ? req.query.endpoint[0] : req.query.endpoint;
  const pathname = `/api/${endpoint || ""}`;
  const body = parseBody(req);
  const result = handleApiRequest(req.method || "GET", pathname, body);

  res.status(result.status).setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(result.payload));
}
