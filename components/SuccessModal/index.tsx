import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Action,
} from "@radix-ui/react-alert-dialog";

import styles from "./successModal.module.css";

export function SuccessModal({
  open,
  closeModal,
  successMessage,
}: {
  open: boolean;
  closeModal: () => void;
  successMessage: string;
}) {
  return (
    <div>
      <Root open={open}>
        <Portal>
          <Overlay className={styles.modalOverlay} />
          <Content className={styles.modalContent}>
            <Title className={styles.modalTitle}>
              <div dangerouslySetInnerHTML={{ __html: successMessage }} />
            </Title>
            <div className={styles.modalButtonContainer}></div>
            <Action asChild>
              <button onClick={closeModal} className="button">
                <span>Close</span>
              </button>
            </Action>
          </Content>
        </Portal>
      </Root>
    </div>
  );
}
