import axios from "axios";

export async function checkEmail(email) {
  try {
    const result = await axios.post(
      "/api/auth/checkEmail",
      { email },
      { timeout: 30000 }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
}
