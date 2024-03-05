/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import AllAssignmentCard from "./AllAssignmentCard";
import MenuBanner from "../../Components/SocialLogin/MenuBanner/MenuBanner";
import bgimg from '../../assets/Banner/3.jpg'

const AllAssignment = () => {
    const [assignment, setAssignment] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [selecteddifficulty, setSelectedDifficulty] = useState(null);

    // Fetch Assignment data
    useEffect(() => {
        fetch('http://localhost:5000/allAssignment')
            .then(res => res.json())
            .then(data => {
                setAssignment(data)
                setIsLoading(false);
            });
    }, []);

    

    // Handle search
    const handleSearch = async (event) => {
        if (event.key === "Enter") {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:5000/allAssignment"
            );
            const data = await response.json();
            const filteredProducts = data.filter(
                (item) =>
                    item.assignmentTitle.toLowerCase().includes(inputValue.toLowerCase())
            );
            setAssignment(filteredProducts);
            setIsLoading(false);
        }
    };

    // Fetch Assignment data by Difficulty
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:5000/allAssignment"
            );
            const data = await response.json();

            if (selecteddifficulty) {
                let filteredData = data.filter(
                    (item) => item.difficulty === selecteddifficulty
                );
                setAssignment(filteredData);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selecteddifficulty]);

    // Handle category change
    const handleDifficultyChange = (event) => {
        setSelectedDifficulty(event.target.value);
    };

    return (
        <div>
            <MenuBanner title='All Assignment' bgImg={bgimg}></MenuBanner>
            <div className="md:flex my-4 gap-4">
                <select
                    onChange={handleDifficultyChange}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option disabled selected>
                        Select a Difficulty
                    </option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <input
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleSearch}
                    type="text"
                    placeholder="Search By Assignment Title..."
                    className="input input-bordered w-full mt-3 md:mt-0"
                />
            </div>
            <div>
                {assignment.length > 0 ? (
                    <div>
                        <h1 className="text-center font-bold text-6xl mb-5 mt-5">
                            Available <span className="text-blue-400"> Assignments</span>
                        </h1>
                        <hr />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
                            {assignment.map((assignmentItem) => (
                                <AllAssignmentCard
                                    key={assignmentItem._id}
                                    assignmentItem={assignmentItem}
                                ></AllAssignmentCard>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        {isLoading ? (
                            <div className="flex justify-center items-center mt-20">
                                <div className="hero w-2/3 h-2/3">
                                    <div className=""></div>
                                    <div className="hero-content text-center">
                                        <div className="max-w-md">
                                            <span className="loading loading-bars loading-lg"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center mt-20">
                                <div className="hero w-2/3 h-2/3">
                                    <div className=""></div>
                                    <div className="hero-content text-center ">
                                        <div className="max-w-md">
                                            <h1 className="mb-5 text-5xl font-bold">
                                                Hey Buddy
                                            </h1>
                                            <p className="mb-5 text-xl ">
                                                There is noting to show <br /> Assignment Will be available soon
                                            </p>
                                            <button className="btn  text-white bg-[#E59285] hover:bg-[#E59285]">
                                                Play
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllAssignment;
