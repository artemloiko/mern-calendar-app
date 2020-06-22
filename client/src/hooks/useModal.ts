import { useCallback, useState } from 'react';

export function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return [modalOpen, handleModalOpen, handleModalClose] as const;
}
