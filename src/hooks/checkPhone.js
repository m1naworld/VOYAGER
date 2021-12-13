import axios from "axios";

export async function checkPhone(phone) {
  try {
    const result = await axios.post(
      "/api/auth/checkPhone",
      { phone },
      { timeout: 30000 }
    );
    return result.data;
  } catch (err) {
    return err.response.data;
  }
}
