import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/icons';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ChatAvatar({
  role,
  className,
}: {
  role: 'user' | 'assistant';
  className?: string;
}) {
  if (role === 'user') {
    return (
      <Avatar className={cn('border', className)}>
        <AvatarFallback>
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    );
  }
  return (
    <Avatar className={cn('p-1 border-primary', className)}>
      <Logo className="h-full w-full" />
    </Avatar>
  );
}
