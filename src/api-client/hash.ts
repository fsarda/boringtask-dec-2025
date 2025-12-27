import sortKeys from "sort-keys";

//Brought from internet
function toHex(buffer: ArrayBuffer) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}
export const hashObject = async <T extends {}>(hashable: T) => {
  const msgUint8 = new TextEncoder().encode(
    JSON.stringify(sortKeys(hashable, { deep: true }))
  );
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
  const hashHex = toHex(hashBuffer);
  return hashHex;
};
