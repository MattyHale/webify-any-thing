const SHEET_NAME = 'Submissions';

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
      'page_title'
    ];

    for (const key of required) {
      if (!body[key] || String(body[key]).trim().length === 0) {
        return json_(400, { ok: false, message: `Missing field: ${key}` });
      }
    }

    const email = String(body.email).trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return json_(400, { ok: false, message: 'Please provide a valid email address.' });
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
      email,
      body.org,
      body.proposed_change,
      body.rationale,
      body.user_agent || '',
      ip,
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
      'Status'
    ]);
  }

  return sheet;
}

function json_(status, obj) {
  const output = ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );

  // Apps Script ContentService cannot set non-200 status codes for Web Apps.
  // `ok` and `message` in JSON should be used by the caller.
  return output;
}
