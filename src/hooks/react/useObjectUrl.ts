import { useEffect, useState } from 'react';

export type UseObjectUrlReturn = string | null;

/**
 * Creates an object URL for a `Blob` or `File` with `URL.createObjectURL` and revokes it on update or unmount.
 * Returns `null` when `blob` is `null` or `undefined`.
 */
export function useObjectUrl(blob: Blob | File | null | undefined): UseObjectUrlReturn {
  const [url, setUrl] = useState<UseObjectUrlReturn>(null);

  useEffect(() => {
    if (blob == null) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(blob);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [blob]);

  return url;
}
