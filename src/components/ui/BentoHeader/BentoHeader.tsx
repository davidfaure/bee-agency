import { AnimationParagraph } from "@/components/animation/Paragraph";
import styles from "./BentoHeader.module.scss";

interface BentoHeaderProps {
  title: string;
  description?: string | string[];
  className?: string;
}

export function BentoHeader({
  title,
  description,
  className,
}: BentoHeaderProps) {
  const lines = description
    ? Array.isArray(description)
      ? description
      : [description]
    : [];

  return (
    <div className={`${styles.header} ${className || ""}`}>
      <AnimationParagraph>
        <h3 className={styles.title}>{title}</h3>
      </AnimationParagraph>
      {lines.length > 0 ? (
        <div className={styles.descriptions}>
          {lines.map((text, i) => (
            <AnimationParagraph key={i}>
              <p className={styles.descriptionMultiple}>{text}</p>
            </AnimationParagraph>
          ))}
        </div>
      ) : (
        <AnimationParagraph>
          <p className={styles.description}>{lines[0]}</p>
        </AnimationParagraph>
      )}
    </div>
  );
}
