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
    console.log(res);
    return { ...res.data, status: res.status };
  } catch (err) {
    console.log(err.response);
    return new Error({ ...err.response.data, status: err.response.status });
  }
};

export default myAxios;
// 일반 axios , axios hook 둘다 같은문제 나타남 -> 백앤드에서 갱신된 리프레시토큰이 디비에 저장안되는듯
