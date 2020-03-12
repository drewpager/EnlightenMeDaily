import { gql } from 'apollo-boost';

interface LogInInput {
  code: string;
}

export const LOG_IN = gql`
  mutation LogIn($input: LogInInput) {
    logIn(input: $input) {
      id
      token
      avatar
      contact
      didRequest
    }
  }
`;