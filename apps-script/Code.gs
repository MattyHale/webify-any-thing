const SHEET_NAME = 'Submissions';

// Script Properties keys:
// TURNSTILE_SECRET = your Turnstile secret key

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');

    const required = [
      'name',
      'email',
      'org',
      'type',
      'proposed_change',
      'rationale',
      'page_url',
      'page_title',
      'cf-turnstile-response'
    ];

    for (const key of required) {
      if (!body[key] || String(body[key]).trim().length === 0) {
        return json_(400, { ok: false, message: `Missing field: ${key}` });
      }
    }

    const verified = verifyTurnstile_(body['cf-turnstile-response']);
    if (!verified) {
      return json_(403, { ok: false, message: 'Verification failed. Please retry.' });
    }

    const sheet = getOrCreateSheet_();
    const now = new Date();
    const ip = ''; // Apps Script does not reliably expose caller IP in Web Apps.

    sheet.appendRow([
      now,
      body.page_url,
      body.page_title,
      body.section || '',
      body.type,
      body.name,
      body.email,
      body.org,
      body.proposed_change,
      body.rationale,
      body.user_agent || '',
      ip,
      'true',
      'received'
    ]);

    return json_(200, { ok: true });
  } catch (error) {
    return json_(500, { ok: false, message: 'Server error.' });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Page URL',
      'Page Title',
      'Section',
      'Type',
      'Name',
      'Work Email',
      'Organisation',
      'Proposed Change',
      'Rationale',
      'User Agent',
      'IP (optional)',
      'Turnstile Verified',
      'Status'
    ]);
  }

  return sheet;
}

function verifyTurnstile_(token) {
  const secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return false;

  const res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'post',
    payload: {
      secret,
      response: token
    },
    muteHttpExceptions: true
  });

  const data = JSON.parse(res.getContentText() || '{}');
  return data && data.success === true;
}

function json_(status, obj) {
  const output = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );

  // Apps Script ContentService cannot set non-200 status codes for Web Apps.
  // `ok` and `message` in JSON should be used by the caller.
  return output;
}
