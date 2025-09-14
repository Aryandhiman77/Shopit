import crypto from "crypto";
const cryptoHash = (data, algorithm = "sha256") => {
  const hash = crypto.createHash(algorithm).update(data).digest("hex");
  return hash;
};
export default cryptoHash;
