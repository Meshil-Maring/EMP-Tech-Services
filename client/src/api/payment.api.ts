import { server_url } from "../utils/url";

export const createOrder = async (data: object) => {
  const res = await fetch(`${server_url}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  return res.json();
};
