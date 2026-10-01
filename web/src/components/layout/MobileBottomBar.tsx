import { Button } from "../ui/Button";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { waLink } from "../../lib/whatsapp";
import { useBranch } from "../../lib/branch";

export function MobileBottomBar() {
  const { to, whatsapp, displayName } = useBranch();
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-5 pt-3 backdrop-blur-md sm:hidden"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-3">
        <Button href={to("#reservasi")} className="flex-grow !min-h-[50px]">
          Reservasi Meja
        </Button>
        <a
          href={waLink(whatsapp, `Halo ${displayName}, saya mau tanya.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat WhatsApp ${displayName}`}
          className="inline-flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full border border-line-input text-ink hover:border-ink"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
