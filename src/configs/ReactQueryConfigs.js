const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMout: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 60 * 1000,
  },
};

export default defaultOptions;
