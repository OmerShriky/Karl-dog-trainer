/**
 * Receives the contact form from Karl's site, adds a row to this sheet and emails Karl.
 * Setup: Extensions > Apps Script, paste this file, Deploy > New deployment > Web app,
 * Execute as: Me, Who has access: Anyone. Paste the Web app URL into content.json > contact.sheetsUrl.
 */
const SHEET_NAME = 'פניות';
const NOTIFY_EMAIL = 'karlgdog@gmail.com'; // Leave empty ('') to skip the email

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  if (data.website) return reply_(); // Spam trap

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['תאריך', 'שם', 'טלפון', 'הודעה', 'עמוד', 'טופל?']);
    sheet.setFrozenRows(1);
    sheet.setRightToLeft(true);
  }
  const lead = { name: clean_(data.name), phone: clean_(data.phone), message: clean_(data.message), page: clean_(data.page) };
  // The apostrophe keeps the leading 0 of the phone number
  sheet.appendRow([new Date(), lead.name, "'" + lead.phone, lead.message, lead.page, false]);
  sheet.getRange(sheet.getLastRow(), 6).insertCheckboxes();

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'פנייה חדשה מהאתר: ' + lead.name,
      body: 'שם: ' + lead.name + '\nטלפון: ' + lead.phone + '\nהודעה: ' + lead.message + '\n\nכל הפניות: ' + ss.getUrl(),
    });
  }
  return reply_();
}

// Cuts long input and stops text that starts with = + - @ from running as a formula
function clean_(value) {
  const v = String(value || '').slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function reply_() {
  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}
