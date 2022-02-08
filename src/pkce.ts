import { createHash } from 'crypto'

export type PKCECodePair = {
  codeVerifier: string
  codeChallenge: string
  createdAt: Date
}

export const base64URLEncode = (str: Buffer): string => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export const makeid = (length: number): string => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export const sha256 = (buffer: Buffer): Buffer => {
  return createHash('sha256').update(buffer).digest()
}

export const createPKCECodes = (): PKCECodePair => {
  const codeVerifier = makeid(60)
  const codeChallenge = base64URLEncode(sha256(Buffer.from(codeVerifier)))
  const createdAt = new Date()
  const codePair = {
    codeVerifier,
    codeChallenge,
    createdAt
  }
  return codePair
}
