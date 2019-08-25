import { Members } from 'chat-client/shared/types';
import { Result } from 'chat-shared/classes';

export const sortMembers = (members: Members[]): Result<Members[]> => {
  // Sort members by Online / Offline
  const result = members.sort((a, b) => {
    // Default to 0 - No sorting needed
    let returnVal = 0;
    // If 'a' is online, subtract 1 to move
    // 'a' up in the sort order
    if (a.online) {
      returnVal = returnVal - 1;
    }
    // If `b` is online add 1 to move 'b' up
    if (b.online) {
      returnVal = returnVal + 1;
    }
    return returnVal;
  });
  if (result) {
    return Result.ok(result);
  } else {
    return Result.fail('Error parsing members');
  }
};
