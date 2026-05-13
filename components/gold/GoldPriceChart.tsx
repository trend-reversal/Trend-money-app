"use client";

import {
    Area,
    AreaChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

type GoldPricePoint = {
    slot_time: string;
    rate: string;
};

type Props = {
    data: GoldPricePoint[];
};

const formatMonth = (date: string) => {
    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            month: "short",
            year: "2-digit",
        },
    );
};

export default function GoldPriceChart({
    data,
}: Props) {
    const chartData = [...data]
        .reverse()
        .map((item) => ({
            date: formatMonth(
                item.slot_time,
            ).toUpperCase(),
            rate: Number(item.rate),
        }));

    return (
        <div className="h-[420px] w-full rounded-[20px] bg-[#F7F7F9] overflow-hidden relative">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <AreaChart
                    data={chartData}
                    margin={{
                        top: 40,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="goldGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#D4AF37"
                                stopOpacity={0.16}
                            />

                            <stop
                                offset="100%"
                                stopColor="#D4AF37"
                                stopOpacity={0.04}
                            />
                        </linearGradient>
                    </defs>

                    <Tooltip
                        cursor={false}
                        content={({ active, payload }) => {
                            if (
                                active &&
                                payload &&
                                payload.length
                            ) {
                                const item =
                                    payload[0].payload;

                                return (
                                    <div
                                        className="
                      bg-white
                      px-5
                      py-4
                      rounded-[18px]
                      shadow-[0px_4px_20px_rgba(0,0,0,0.08)]
                      border border-[#F3F3F3]
                    "
                                    >
                                        <p className="text-[12px] text-[#9CA3AF] text-center">
                                            {item.date}
                                        </p>

                                        <p className="text-[18px] font-semibold text-[#D4AF37] mt-1">
                                            ₹
                                            {item.rate.toLocaleString(
                                                "en-IN",
                                            )}
                                            /g
                                        </p>
                                    </div>
                                );
                            }

                            return null;
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#D4AF37"
                        strokeWidth={4}
                        fill="url(#goldGradient)"
                        dot={false}
                        activeDot={{
                            r: 10,
                            fill: "#D4AF37",
                            stroke: "#F4E3A1",
                            strokeWidth: 6,
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}