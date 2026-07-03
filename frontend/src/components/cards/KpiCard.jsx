const KpiCard = ({ title, value, unit, color }) => {

    return (

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 hover:scale-[1.02] transition">

            <p className="text-slate-400">

                {title}

            </p>

            <h2 className={`text-4xl font-bold mt-4 ${color}`}>

                {value}

                <span className="text-xl ml-1">

                    {unit}

                </span>

            </h2>

        </div>

    );

};

export default KpiCard;