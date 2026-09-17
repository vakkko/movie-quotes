import { router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';

import { logout } from '@/actions/App/Http/Controllers/AuthController';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type LogoutButtonProps = {
    className?: string;
    showIcon?: boolean;
};

const LogoutButton = ({ className, showIcon = true }: LogoutButtonProps) => {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            onClick={() => router.post(logout.url())}
            className={cn(
                'flex-items-center justify-start gap-[4.3rem]',
                className,
            )}
        >
            {showIcon && <LogOut size={32} />}
            {t('log_out')}
        </button>
    );
};

export default LogoutButton;
