import axios from "axios";

export async function checkEmail(email) {
  try {
    const result = await axios.post(
      "/api/confirm/checkEmail",
      { email },
      { timeout: 30000 }
    );
    console.log(result);
    return result.data;
  } catch (err) {
    return err.response.data;
  }
}
