const KpiCard = ({ title, value, unit }) => {
    return (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">

            <p className="text-slate-400 text-sm">
                {title}
            </p>

            <h2 className="text-4xl font-bold mt-3">

                {value}

                <span className="text-xl ml-2">
                    {unit}
                </span>

            </h2>

        </div>
    );
};

export default KpiCard;