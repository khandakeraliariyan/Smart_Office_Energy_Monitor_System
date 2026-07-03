import { FaBolt } from "react-icons/fa";
import { MdCircle } from "react-icons/md";

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

                        Real-Time Energy Monitoring

                    </p>

                </div>

            </div>

            <div className="flex items-center gap-2">

                <MdCircle className="text-green-500 animate-pulse" />

                <span className="text-sm text-slate-400">

                    Live

                </span>

            </div>

        </nav>

    );

};

export default Navbar;