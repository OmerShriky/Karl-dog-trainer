# האתר של קרל אילוף כלבים

אתר סטטי (HTML, CSS, JavaScript) בלי שלב בנייה. Vercel מעלה אותו כמו שהוא.

| קובץ | מה יש בו |
|---|---|
| `content.json` | כל התוכן: טקסטים, שירותים, שאלות, ביקורות, תמונות וקישורים |
| `index.html`, `services.html`, `faq.html` | שלושת העמודים |
| `assets/style.css` | העיצוב |
| `assets/site.js` | הקוד שבונה את העמודים מתוך `content.json` |
| `assets/analytics.js` | Google Tag Manager. כאן מדביקים את מזהה ה-GTM |
| `media/` | תמונות, סרטונים ולוגו |
| `.pages.yml` | הגדרות מסך העריכה של Pages CMS |
| `vercel.json` | כתובות נקיות (`/services` במקום `/services.html`) |

## צפייה מקומית
האתר טוען את `content.json`, ולכן פתיחה ישירה של `index.html` מהמחשב לא תעבוד. מריצים בתיקייה:

```
npx serve .
```

ופותחים את הכתובת שמופיעה.

## טופס יצירת קשר
הטופס שולח מייל דרך Web3Forms. מדביקים את המפתח בשדה `contact.web3formsKey` בקובץ `content.json`. כל עוד השדה ריק, הטופס מציע לשלוח את הפרטים בוואטסאפ.

## אירועים שנשלחים ל-Google Tag Manager
- `whatsapp_click`: לחיצה על כל קישור לוואטסאפ
- `email_click`: לחיצה על המייל
- `social_click`: לחיצה על אינסטגרם, פייסבוק, איזי או במדים (`link_label` אומר על מה)
- `generate_lead`: טופס יצירת קשר שנשלח בהצלחה
