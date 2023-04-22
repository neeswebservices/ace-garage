export const Hero = () => {
    return (
        <div className="bg-white ml-6 mt-[-100px]">
            <div className="flex items-center max-h-[100vh] h-screen">
                <div className=" px-8 w-1/2">
                    <div className="text-7xl text-gray-900 font-semibold">
                        <h1>Building digital</h1>
                        <h1>products, brands</h1>
                        <h1 className="text-blue-600">experience</h1>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad
                            similique nam fugit veritatis quos expedita quidem maxime at quas
                            voluptatum, architecto maiores excepturi. Quos quia, magnam
                            accusamus quasi impedit necessitatibus.
                        </p>
                    </div>
                    <div className="mt-4 flex items-center space-x-4">
                        <input
                            type="text"
                            className="bg-white rounded h-full py-2.5 w-3/5 border border-gray-400/50 px-2"
                            placeholder="Enter you email"
                        />
                        <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white">
                            Submit
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Hero; 