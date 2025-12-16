import { BandContent } from '@/lib/types';
import { cx } from '@/lib/utils';

interface SocialLinksProps {
  socials: BandContent['socials'];
  className?: string;
}

export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <div className={cx('flex flex-wrap items-center gap-3', className)}>
      {socials.map((social) => (
        <a
          key={social.url}
          href={social.url}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white hover:border-seaglass hover:text-seaglass"
          target="_blank"
          rel="noreferrer"
        >
          {social.icon && <span aria-hidden className="text-lg">{social.icon}</span>}
          <span>{social.label}</span>
        </a>
      ))}
    </div>
  );
}
