import { useRef } from "react";
import useSWRInfinite from "swr/infinite";

const useStaleSwr = ({ getKey, fetcher, config = {} }) => {
  const mutableRef = useRef();

  const { data, ...rest } = useSWRInfinite(getKey, fetcher, {
    ...config,
    initialData: mutableRef.current ? mutableRef.current : config.initialData,
  });

  if (data !== undefined && mutableRef) {
    mutableRef.current = data;
  }

  return { data: data ?? mutableRef.current, ...rest };
};

export default useStaleSwr;
