interface ActionCreator {
  type: string;
  payload: any;
}

export const actionCreator = (type: string, payload?: any): ActionCreator => {
  return {
    type,
    payload,
  };
};
