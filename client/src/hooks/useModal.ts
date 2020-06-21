import { useCallback, useState } from 'react';

export function useModal() {
  const [buildModalOpen, setBuildModalOpen] = useState(false);
  const handleBuildModalOpen = useCallback(
    (e) => {
      if (e.type === 'keydown' && e.key !== ' ' && e.key !== 'Enter') {
        return;
      }
      setBuildModalOpen(true);
    },
    [setBuildModalOpen],
  );
  const handleBuildModalClose = useCallback(() => {
    setBuildModalOpen(false);
  }, [setBuildModalOpen]);

  return [buildModalOpen, handleBuildModalOpen, handleBuildModalClose] as const;
}
