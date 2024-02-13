/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { axios_api_instance } from "../axios_helpers/axios_api";

type ErrorMessageType = {
  error_message: string;
  traceback?: string;
};

type HttpMethod = "get" | "post" | "put" | "delete";

const useFetch = (url: string, method: HttpMethod, body?: any) => {
  const [apiData, setApiData] = useState<any>(null);
  const [serverError, setServerError] = useState<ErrorMessageType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        let response;
        switch (method) {
          case "get":
            response = await axios_api_instance.get(url);
            break;
          case "post":
            response = await axios_api_instance.post(url, body);
            break;
          case "put":
            response = await axios_api_instance.put(url, body);
            break;
          case "delete":
            response = await axios_api_instance.delete(url);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setApiData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setServerError({
            error_message: error.message,
          });
        } else {
          setServerError({
            error_message: "An unknown error occurred",
          });
        }
      }
    })();
  }, [url, body, method]);

  return { apiData, serverError };
};

export default useFetch;
