import axios from "axios";

const myAxios = async (
  url,
  data = false,
  target = "application/json; charset=utf-8",
  timeout = 10000
) => {
  try {
    if (data) {
      const res = await axios.post(url, data, {
        headers: { "Context-Type": target },
        timeout,
        withCredentials: true,
      });

      return { ...res.data, status: res.status };
    }
    const res = await axios.get(url, { timeout });
    return { ...res.data, status: res.status };
  } catch (err) {
    return new Error({ ...err.response.data, status: err.response.status });
  }
};

export default myAxios;
