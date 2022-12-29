

/** States the identity provider */
export type AuthMethod = 'GOOGLE' | 'MICROSOFT';

/** Wrapper for the auth headers to the backend */
export function getAuthHeaders(authMethod: AuthMethod, token: string){
  return {
    'x-authmode': authMethod,
    'authorization': `Bearer ${token}`
  }
}