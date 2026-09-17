import { router } from '@inertiajs/react';
import { Ellipsis, Eye, Pencil, Trash2 } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/hooks/useTranslation';
import { show as showQuoteRoute } from '@/routes/news/quotes';
import type { MovieQuote } from '@/types';

type QuoteDropdownProps = {
    quote: MovieQuote;
    onDelete: (quote: MovieQuote) => void;
};

const QuoteDropdown = ({ quote, onDelete }: QuoteDropdownProps) => {
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="absolute top-[2.4rem] right-[2.4rem] cursor-pointer"
                >
                    <Ellipsis className="text-gray-400 transition-colors hover:text-white" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-52 rounded-2xl border-gray-800 bg-[#1e1e24] p-2 text-gray-200 shadow-xl"
                align="end"
            >
                <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    onClick={() => router.visit(showQuoteRoute.url(quote.id))}
                >
                    <Eye className="h-4 w-4" />
                    <span className="text-[15px]">{t('view_quote')}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    onClick={() =>
                        router.visit(
                            showQuoteRoute.url(quote.id, {
                                query: { edit: 1 },
                            }),
                        )
                    }
                >
                    <Pencil className="h-4 w-4" />
                    <span className="text-[15px]">{t('edit')}</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-white/10"
                    onClick={() => onDelete(quote)}
                >
                    <Trash2 className="h-4 w-4" />
                    <span className="text-[15px]">{t('delete')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default QuoteDropdown;
