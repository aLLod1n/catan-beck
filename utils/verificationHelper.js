let nodemailer = require("nodemailer");
let player = require("../models/Player");
const generateToken = require("../config/generateToken");

// generate code for verification
async function generateVerificationCode() {
  let code = Math.random().toString(36).substring(2, 10);
  let checkCodeExists = await player.findOne({ verificationCode: code });
  if (checkCodeExists) {
    return generateVerificationCode();
  }
  return code;
}
async function checkEmailVerified(email) {
  let playerVerified = await player.findOne({ email });
  if (playerVerified && playerVerified.verified) {
    return true;
  } else {
    return false;
  }
}
async function resendVerificationCode(req, res) {
  try {
    let { email } = req.body;
    let playerVerified = await player.findOne({ email });
    if (playerVerified) {
      if (playerVerified.verified) {
        return res.status(200).json({
          status: true,
          message: "already verified",
        });
      }
      let verificationCode = playerVerified.verificationCode;
      let emailSent = await sendVerificationCode(email, verificationCode);
      if (emailSent) {
        return res.status(200).json({
          status: true,
          message: "email sent",
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "email was not sent",
        });
      }
    } else {
      return res.status(200).json({
        status: false,
        message: "email doesnot exist",
      });
    }
  } catch (e) {
    console.log(e.message);
    return false;
  }
}

async function sendVerificationCode(email, verification_code) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verification Email",
    html: verificationTemplate(
      process.env.FRONTEND_URL + "/verify/" + verification_code
    ),
  };

  let response;
  await transporter.sendMail(mailOptions).catch((e) => {
    response = false;
  });
  response = true;
  return response;
}

async function verify(req, res) {
  try {
    let { verificationCode } = req.body;
    let playerVerified = await player.findOneAndUpdate(
      { verificationCode },
      { verified: true }
    );

    if (playerVerified) {
      const roles = Object.values(playerVerified.roles).filter(Boolean);

      const access_token = generateToken(
        {
          UserInfo: {
            _id: playerVerified._id,
            roles: roles,
          },
        },
        "access_token",
        "30d"
      );
  
      const refresh_token = generateToken(
        {
          UserInfo: {
            _id: playerVerified._id,
            roles: roles,
          },
        },
        "refresh_token",
        "30d"
      );

      let newPlayer = await player.updateOne(
        { verificationCode },
        {
          $set: {
            refresh_token: refresh_token,
          },
        }
      );
        
      if (newPlayer) {
        let updatedPlayer = await player.findOne({ verificationCode });

        res.cookie("jwt", refresh_token, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
  
        return res.status(200).json({ 
          _id: updatedPlayer._id,
          access_token: access_token,
          username: updatedPlayer.username,
          email: updatedPlayer.email,
          avatar: updatedPlayer.avatar,
          address: updatedPlayer.address,
          verified: updatedPlayer.verified,
          roles: updatedPlayer.roles
        });
      }
    }
    
    return res.status(200).json(false);
  } catch (e) {
    console.log(e.message);
    return false;
  }
}
function verificationTemplate(verification_link) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Verification</title>
    </head>
    <body>
      <table align="center" width="600" cellpadding="0" cellspacing="0" style="background-color: #fff; border-collapse: collapse;">
        <tr>
          <td style="padding: 20px;">
            <h1 style="text-align:center;">Welcome to ${process.env.COMPANY_NAME}</h1>
            <p>Thanks for updating profile. please verify your email address by clicking the button below:</p>
            <table align="center" style="margin: 20px auto;">
              <tr>
                <td>
                  <a href="${verification_link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 18px; text-decoration: none;">
                    Verify my email
                  </a>
                </td>
              </tr>
            </table>
            <p>If you have any issues or didn't sign up for an account, please contact us at <a href="mailto:${process.env.COMPANY_EMAIL}">${process.env.COMPANY_EMAIL}</a></p>
            <p><b>If you haven't signup with us, please disregard this email and do not click on the verify button. We apologize for any inconvenience this may have caused.</b></p>
          </td>
        </tr>
      </table>
    </body>
    </html>  
    `;
}

module.exports = {
  generateVerificationCode,
  sendVerificationCode,
  checkEmailVerified,
  verify,
  resendVerificationCode,
};
