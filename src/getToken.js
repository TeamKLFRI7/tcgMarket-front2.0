export const getToken = async () => {
  const localToken = localStorage.getItem("token");
  if (localToken) {
    return localToken;
  }
  throw new Error("Aucun token trouvé.");
};
