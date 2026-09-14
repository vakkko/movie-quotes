import type { MouseEventHandler, PropsWithChildren } from 'react';

type ReactionWrapperProps = PropsWithChildren & {
    count: number;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ReactionWrapper = ({ count, children, onClick }: ReactionWrapperProps) => {
    return (
        <button
            className="flex-items-center gap-[1.2rem] text-white"
            onClick={onClick}
        >
            <span className="text-[2rem]">{count}</span>
            {children}
        </button>
    );
};

export default ReactionWrapper;
