const mongoErrorHandler = (code: number): string => {
  let message;
  switch (code) {
    case 11000:
      message = 'This user may already exist';
      break;
    default:
      message = 'Sorry an error has occured';
  }
  return message;
};

export default mongoErrorHandler;
