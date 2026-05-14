type Props = {
    title: string;
    icon: string;
    recommended?: boolean;
    onClick: () => void;
};

export default function QuickActionCard({
    title,
    icon,
    recommended,
    onClick,
}: Props) {
    return (
        <button
            onClick={onClick}
            className="
        relative
        w-full
        h-[92px]
        bg-white
        border border-[#F1F1F1]
        rounded-[14px]
        shadow-sm
        flex flex-col items-center justify-center
        active:scale-[0.98]
        transition
      "
        >
            {recommended && (
                <div className="absolute top-0 right-0 bg-[#16A34A] text-white text-[8px] px-2 py-1 rounded-tr-[14px] rounded-bl-[10px] font-semibold">
                    RECOMMENDED
                </div>
            )}

            <img
                src={icon}
                alt={title}
                className="w-[34px] h-[34px] object-contain"
            />

            <p className="text-[14px] mt-2 font-medium text-black">
                {title}
            </p>
        </button>
    );
}