import { FaClipboardCheck, FaFlag } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";

const Featured = () => {
    return (
        <div className="mt-20">
            <h1 className="font-teko font-extrabold text-center text-7xl mb-3">Feature</h1> <hr />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-blue-400"><FaFlag></FaFlag></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Connect Student to Each Others</h2>
                        <p>Connect Global student ... We connect For make a connection</p>

                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-blue-400"><FaClipboardCheck></FaClipboardCheck></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Create Assignment for students</h2>
                        <p>This website For upgrade your skill</p>

                    </div>
                </div>
                <div className="card  bg-base-100 shadow-xl">
                    <figure className="text-7xl text-blue-400"><FaPeopleGroup></FaPeopleGroup></figure>
                    <div className="card-body">
                        <h2 className="card-title text-center font-outfit font-bold text-xl">Marking added assignment</h2>
                        <p>We inspire new generations Upgrade their skill...And They Can Give assignment and marking others student</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Featured;