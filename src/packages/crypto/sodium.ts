import sodium from 'libsodium-wrappers';

let readyPromise: Promise<typeof sodium> | null = null;

export async function getSodium(): Promise<typeof sodium> {
  if (!readyPromise) {
    readyPromise = sodium.ready.then(() => {
      console.log('libsodium initialized: version ' + sodium.sodium_version_string());
      return sodium;
    });
  }
  return readyPromise;
}
