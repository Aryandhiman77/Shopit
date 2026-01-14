import { APP_URL } from "../../../Config/appConfig.js";
export const brandRequestionRejectionMail = ({
  COMPANY_LOGO = `${APP_URL}/logo.svg`,
  COMPANY_NAME = process.env.COMPANY_NAME || "Shopit",
  BRAND_NAME,
  SELLER_NAME,
  REASON = undefined,
  DASHBOARD_URL = "www.google.com",
  SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@shopit.in",
}) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Brand Request Rejected</title>
  <style>
    body { margin:0; padding:0; background:#f3f4f6; -webkit-font-smoothing:antialiased; }
    .email-wrap { width:100%; max-width:680px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial; }
    .header { padding:24px; text-align:center; background:#111827; color:#fff; }
    .logo { height:42px; margin-bottom:8px; display:inline-block; }
    .title { padding:28px 28px 0; color:#111827; font-size:20px; font-weight:700; }
    .lead { padding:10px 28px 18px; color:#6b7280; font-size:14px; line-height:1.6; }
    .status-box { padding:18px 28px; text-align:center; }
    .status { display:inline-block; background:#07a8f3ff; border:1px solid #a1dbf6ff; padding:14px 24px; font-size:16px; font-weight:700; color:#166534; border-radius:8px; }
    .cta { padding:8px 28px 24px; text-align:center; }
    .button { display:inline-block; background:#22c55e; color:#ffffff; padding:12px 26px; font-size:14px; font-weight:600; text-decoration:none; border-radius:6px; }
    .notice { padding:18px 28px; background:#f8fafc; color:#374151; border-top:1px solid #e5e7eb; font-size:13px; }
    .footer { padding:20px 28px; color:#9ca3af; font-size:12px; text-align:center; }
    .green { color : "green"; }
    @media(max-width:480px){
      .title { font-size:18px; padding:18px; }
      .lead, .status-box, .notice { padding:16px; }
      .header { padding:18px; }
    }
  </style>
</head>
<body>

<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6; padding:24px 12px;">
  <tr>
    <td align="center">

      <table role="presentation" class="email-wrap" width="100%" cellspacing="0" cellpadding="0">

        <!-- Header -->
        <tr>
          <td class="header">
            <img src="${COMPANY_LOGO}" alt="${COMPANY_NAME} logo" class="logo" />
            <div style="font-size:14px; opacity:0.9;">${COMPANY_NAME}</div>
          </td>
        </tr>

        <!-- Title -->
        <tr>
          <td class="title">
            Brand Request Rejected
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td class="lead">
            Hello <strong>${SELLER_NAME}</strong>,<br/><br/>
            We have reviewed your request for creating brand named <strong>${BRAND_NAME}</strong>.
            The uploaded documents not eligible for creating brand, therfore we have decided to reject your request.
            <br>
            ${REASON ? "Reason: " + REASON : ""}
          </td>
        </tr>

        <!-- Status -->
        <tr>
          <td class="status-box">
            <div class="status">
              Status: REJECTED
            </div>
          </td>
        </tr>


        <!-- Notice -->
        <tr>
          <td class="notice">
            If you face any issues, contact us at
            <a href="mailto:${SUPPORT_EMAIL}" style="color:#2563eb; text-decoration:underline;">
              ${SUPPORT_EMAIL}
            </a>.
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td class="footer">
            © ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

<!--
PLAIN TEXT FALLBACK

Brand Request verifiation

Hello ${SELLER_NAME},
Your brand request has under processing.

Visit dashboard: ${DASHBOARD_URL}

${COMPANY_NAME}
-->

</body>
</html>`;
