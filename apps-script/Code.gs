const SHEET_NAME = "Submissions";

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) ? e.postData.contents : "{}");

    // Required fields (NO Turnstile)
    const required = [
      "name",
      "email",
      "org",
      "type",
      "proposed_change",
      "rationale",
      "page_url",
      "page_title"
    ];

    for (const k of required) {
      if (!body[k] || String(body[k]).trim().length === 0) {
        return json_({ ok: false, message: `Missing field: ${k}` });
      }
    }

    // Basic sanity limits (prevents huge spam payloads)
    if (String(body.proposed_change).length > 5000) return json_({ ok: false, message: "Proposed change too long." });
    if (String(body.rationale).length > 5000) return json_({ ok: false, message: "Rationale too long." });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    sheet.appendRow([
      new Date(),
      body.page_url,
      body.page_title,
      body.section || "",
      body.type,
      body.name,
      body.email,
      body.org,
      body.proposed_change,
      body.rationale,
      body.user_agent || "",
      "received"
    ]);

    return json_({ ok: true });

  } catch (err) {
    return json_({ ok: false, message: "Server error." });
  }
}

// Handle preflight requests (helps browsers when doing CORS)
function doOptions() {
  return cors_(ContentService.createTextOutput(""));
}

function json_(obj) {
  return cors_(
    ContentService
      .createTextOutput(JSON.stringify(obj))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

// Add CORS headers
function cors_(output) {
  return output
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
