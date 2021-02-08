export interface JwtToken {
  value: string;
}

export const defaultToken = (): JwtToken => ({ value: '' });
