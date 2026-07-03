import DeviceCard from "./DeviceCard";

const DeviceGrid = ({
    devices,
    onToggle,
}) => {

    return (

        <section>

            <h2 className="text-2xl font-bold mb-6">

                Devices

            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {devices.map(device => (

                    <DeviceCard

                        key={device._id}

                        device={device}

                        onToggle={onToggle}

                    />

                ))}

            </div>

        </section>

    );

};

export default DeviceGrid;