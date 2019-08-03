
import { RegisterActionType, registerError  } from './register-dux';

describe('Login Actions', () => {
  it('should create an action: registerError', () => {
    const errorText = 'Some error message';
    const expectedAction = {
      type: RegisterActionType.FETCH_ERROR,
      payload: errorText,
    };
    expect(registerError(errorText)).toEqual(expectedAction);
  });
});
