import { Heading } from '../Heading';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Text } from '../Text';
import styles from './ModalContent.module.css';

interface ModalContentProps {
  titleId: string;
  descriptionId: string;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
}

/** Dialog·BottomSheet 안쪽: 제목·닫기 버튼, 설명, 내용(넘치면 스크롤), 버튼 영역 (index에서 내보내지 않는다) */
export function ModalContent({
  titleId,
  descriptionId,
  title,
  description,
  footer,
  onClose,
  children,
}: ModalContentProps) {
  return (
    <>
      <div className={styles.header}>
        <Heading level={2} variant="headingSm" id={titleId}>
          {title}
        </Heading>
        <IconButton aria-label="닫기" type="button" onClick={onClose}>
          <Icon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Icon>
        </IconButton>
      </div>
      {description && (
        <Text
          id={descriptionId}
          tone="secondary"
          className={styles.description}
        >
          {description}
        </Text>
      )}
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </>
  );
}
