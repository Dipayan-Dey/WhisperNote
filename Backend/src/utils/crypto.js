import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.CRYPTO_SECRET;
const algorithm = "aes-256-gcm";
const secretKey = crypto
  .createHash("sha256")
  .update(secret)
  .digest();

export function encrypt(text) {
  const iv = crypto.randomBytes(12); 
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();
  // console.log("CRYPTO_SECRET:", process.env.CRYPTO_SECRET);

  return {
    iv: iv.toString("hex"),
    content: encrypted,
    tag: authTag.toString("hex")
  };
}

export function decrypt(encrypted) {
  // 🛑 Guard check
  if (
    !encrypted ||
    !encrypted.iv ||
    !encrypted.content ||
    !encrypted.tag
  ) {
    return "[Invalid or unencrypted message]";
  }

  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(encrypted.iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(encrypted.tag, "hex"));

  let decrypted = decipher.update(encrypted.content, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}


