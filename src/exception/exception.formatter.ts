import { GraphQLError, GraphQLFormattedError } from 'graphql';

export default function formatGraphqlError(
  error: GraphQLError,
): GraphQLFormattedError {
  const graphQLFormattedError: GraphQLFormattedError = {
    message: error.extensions?.exception?.response?.message || error.message,
    path: error.path,
    extensions: {
      statusCode:
        error.extensions?.exception?.response?.statusCode ||
        error.extensions?.status,
      errorDetail: error.extensions?.exception?.response?.error,
      message: error.extensions?.exception?.response?.message || error.message,
    },
  };
  return graphQLFormattedError;
}
