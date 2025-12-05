import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';

export function ChatHeader() {
  return (
    <header className="p-4 border-b w-full flex items-center gap-3 shrink-0">
      <SidebarTrigger className="md:hidden" />
      <Logo className="h-8 w-8 text-primary hidden md:block" />
      <h1 className="text-xl font-headline font-bold text-foreground">
        ICC Net Assistant
      </h1>
    </header>
  );
}
