import {

    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer

} from "recharts";

const PowerChart = ({ history }) => {

    const data =
        [...history]
            .reverse()
            .map(item => ({

                time:
                    new Date(item.createdAt)
                        .toLocaleTimeString(),

                power:
                    item.totalPower

            }));

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Live Power Usage

            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>

                    <XAxis dataKey="time" />

                    <Tooltip />

                    <Line

                        dataKey="power"

                        stroke="#22c55e"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

};

export default PowerChart;