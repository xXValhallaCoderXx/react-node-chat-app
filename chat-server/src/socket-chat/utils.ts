export const generateMessage = (username: string, text: string) => {
  const date = new Date();
  return {
    author: username,
    message: text,
    createdAt: date.toISOString(),
  };
};
