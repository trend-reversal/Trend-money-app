type Props = {
    onClick: () => void;
    loading?: boolean;
};

export default function InstantSipCard({
    onClick,
    loading,
}: Props) {
    return (
        <div className="px-4 mt-6">
            <div
                className="
          bg-[#F9F9FB]
          rounded-lg
          border border-[#F3F3F3]
          shadow
          p-4
          flex justify-between items-start
        "
            >
                <div>
                    <h3 className="text-[14px] font-semibold text-black">
                        Instant SIP
                    </h3>

                    <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                        START SMALL, GROW BIG EVERY MONTH.
                    </p>

                    <h2 className="text-[26px] font-bold mt-2 text-black">
                        ₹2000{" "}
                        <span className="text-[12px] text-gray-400 font-medium">
                            / MONTH
                        </span>
                    </h2>

                    <button
                        onClick={onClick}
                        disabled={loading}
                        className="
              mt-4
              w-[184px]
              h-[43px]
              bg-[#00130C]
              rounded-[10px]
              text-white
              text-[13px]
              font-medium
              flex
              items-center
              justify-center
              disabled:opacity-50
            "
                    >
                        {loading
                            ? "Processing..."
                            : "Start SIP"}
                    </button>
                </div>

                <div className="w-[38px] h-[38px] bg-[#EFE3C2] rounded-md flex items-center justify-center">
                    <svg
                        width="14"
                        height="26"
                        viewBox="0 0 14 26"
                        xmlns="http://www.w3.org/2000/svg"
                        className="rotate-180"
                    >
                        <path
                            d="M8.5 0L1 14H6L4.5 26L13 10H8L8.5 0Z"
                            fill="#775A19"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}