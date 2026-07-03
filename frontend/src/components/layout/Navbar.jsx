import { FaBolt } from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-8 py-4 flex justify-between items-center">

            <div className="flex items-center gap-3">

                <FaBolt className="text-yellow-400 text-2xl" />

                <div>

                    <h1 className="text-xl font-bold">
                        Smart Office Monitor
                    </h1>

                    <p className="text-xs text-slate-400">
                        Real-time Energy Monitoring
                    </p>

                </div>

            </div>

            <div className="text-sm text-slate-400">

                Techathon 2026

            </div>

        </nav>
    );
};

export default Navbar;