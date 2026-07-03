import { FaFan, FaLightbulb } from "react-icons/fa";

const DeviceCard = ({ device, onToggle }) => {

    const Icon =
        device.type === "Fan"
            ? FaFan
            : FaLightbulb;

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="font-semibold">

                        {device.name}

                    </h2>

                    <p className="text-sm text-slate-400">

                        {device.room.name}

                    </p>

                </div>

                <Icon
                    className={`text-3xl ${device.status
                        ? "text-yellow-400"
                        : "text-slate-500"
                        }`}
                />

            </div>

            <div className="mt-6 flex justify-between items-center">

                <span>

                    {device.status
                        ? "ON"
                        : "OFF"}

                </span>

                <button

                    onClick={() =>
                        onToggle(device)
                    }

                    className={`px-4 py-2 rounded-lg text-sm font-medium ${device.status
                        ? "bg-red-500"
                        : "bg-green-500"
                        }`}
                >

                    {device.status
                        ? "Turn Off"
                        : "Turn On"}

                </button>

            </div>

        </div>

    );

};

export default DeviceCard;