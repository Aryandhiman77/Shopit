import { APP_URL } from "../../Config/appConfig.js";

export const verificationOtp = ({
  COMPANY_LOGO = `${APP_URL}/logo.svg`,
  COMPANY_NAME = process.env.COMPANY_NAME || "Shopit",
  SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@shopit.in",
  OTP,
}) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Your OTP</title>
  <style>
    /* keep styles as conservative / inline-friendly as possible */
    body { margin:0; padding:0; background:#f3f4f6; -webkit-font-smoothing:antialiased; }
    .email-wrap { width:100%; max-width:680px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
    .header { padding:24px; text-align:center; background:#111827; color:#fff; }
    .logo { height:42px; margin-bottom:8px; display:inline-block; }
    .greeting { padding:28px 28px 0; color:#111827; font-size:18px; font-weight:600; }
    .lead { padding:6px 28px 18px; color:#6b7280; font-size:14px; line-height:1.5; }
    .otp-box { padding:18px 28px; text-align:center; }
    .otp { display:inline-block; background:#f8fafc; border:1px dashed #e5e7eb; padding:18px 28px; font-size:28px; letter-spacing:6px; font-weight:700; color:#111827; border-radius:8px; }
    .cta { margin-top:16px; font-size:13px; color:#6b7280; }
    .notice { padding:18px 28px; background:#fff7ed; color:#92400e; border-top:1px solid #ffedd5; font-size:13px; }
    .footer { padding:20px 28px; color:#9ca3af; font-size:12px; text-align:center; }
    .secondary { color:#6b7280; font-size:13px; line-height:1.5; padding:12px 28px 28px; }

    /* mobile adjustments */
    @media(max-width:480px){
      .otp { font-size:22px; padding:14px 18px; letter-spacing:4px; }
      .header { padding:18px; }
      .greeting, .lead { padding:18px; }
      .otp-box, .notice, .secondary { padding:16px; }
    }
  </style>
</head>
<body>
  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6; padding:24px 12px;">
    <tr>
      <td align="center">

        <!-- Email container -->
        <table role="presentation" class="email-wrap" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;">
          <!-- Header -->
          <tr>
            <td class="header" style="background:#111827; padding:24px; text-align:center;">
              <!-- logo -->
              <img src=${COMPANY_LOGO} alt="${COMPANY_NAME} logo" class="logo" style="height:42px; display:block; margin:0 auto;" />
              <div style="font-size:14px; opacity:0.9;">${COMPANY_NAME}</div>
            </td>
          </tr>

          <!-- Body / Greeting -->
          <tr>
            <td class="greeting" style="padding:28px 28px 0; color:#111827; font-size:18px; font-weight:600;">
              Your verification code
            </td>
          </tr>

          <tr>
            <td class="lead" style="padding:6px 28px 18px; color:#6b7280; font-size:14px; line-height:1.5;">
              Use the verification code below to complete your action. This code is only valid for <strong>10 minutes</strong>.
            </td>
          </tr>

          <!-- OTP display -->
          <tr>
            <td class="otp-box" style="padding:18px 28px; text-align:center;">
              <div class="otp" style="display:inline-block; background:#f8fafc; border:1px dashed #e5e7eb; padding:18px 28px; font-size:28px; letter-spacing:6px; font-weight:700; color:#111827; border-radius:8px;">
                ${OTP}
              </div>
              <div class="cta" style="margin-top:16px; color:#6b7280; font-size:13px;">
                Or copy and paste the code into the app
              </div>
            </td>
          </tr>

          <!-- Notice -->
          <tr>
            <td class="notice" style="padding:18px 28px; background:#fff7ed; color:#92400e; border-top:1px solid #ffedd5; font-size:13px;">
              If you did not request this code, please ignore this email or contact support at <a href="mailto:${SUPPORT_EMAIL}" style="color:#92400e; text-decoration:underline;">Shopit support.</a>.
            </td>
          </tr>

          <!-- Secondary content -->
          <tr>
            <td class="secondary" style="color:#6b7280; font-size:13px; padding:12px 28px 28px; line-height:1.5;">
              <strong>How it works</strong><br/>
              This code is single-use and will expire after 10 minutes. For security reasons, do not share this code with anyone.
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer" style="padding:20px 28px; color:#9ca3af; font-size:12px; text-align:center;">
              © ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.<br/>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

  <!-- Plain-text fallback (useful to include in multipart email as text/plain) -->
  <!--
  YOUR ${COMPANY_NAME} VERIFICATION CODE

  Code: ${OTP}

  This code will expire in 10 minutes.

  If you didn't request this, ignore.
  -->

</body>
</html>`;
