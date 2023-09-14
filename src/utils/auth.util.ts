import * as _sodium from 'libsodium-wrappers';
import { base64_variants } from 'libsodium-wrappers';
import { PRIVATE_KEY, SUBSCRIBER_ID, UNIQUE_KEY_ID } from '../constants';

export const createAuthorizationHeader = async (message: any) => {
  const { signingString, expires, created } = await createSigningString(
    JSON.stringify(message),
  );
  const signature = await signMessage(signingString, PRIVATE_KEY || '');
  const header = `Signature keyId="${SUBSCRIBER_ID}|${UNIQUE_KEY_ID}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
  return header;
};

const createSigningString = async (
  message: any,
  created = Math.floor(new Date().getTime() / 1000 - 1 * 60).toString(),
  expires = (parseInt(created) + 1 * 60 * 60).toString(),
) => {
  await _sodium.ready;
  const sodium = _sodium;
  const digest = sodium.crypto_generichash(64, sodium.from_string(message));
  const digest_base64 = sodium.to_base64(digest, base64_variants.ORIGINAL);
  const signingString = `(created): ${created}
(expires): ${expires}
digest: BLAKE-512=${digest_base64}`;
  return { signingString, expires, created };
};

const signMessage = async (signingString: string, privateKey: any) => {
  await _sodium.ready;
  const sodium = _sodium;
  const signedMessage = sodium.crypto_sign_detached(
    signingString,
    sodium.from_base64(privateKey, base64_variants.ORIGINAL),
  );
  return sodium.to_base64(signedMessage, base64_variants.ORIGINAL);
};
