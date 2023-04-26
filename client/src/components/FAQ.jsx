import React from "react";

const FAQ = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-10 mt-14">
        <div>
          <div className="max-w-2xl">
            <h1 className="text-black dark:text-white text-2xl font-bold">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="mt-10 border bg-blue-100 border-blue-500/50 p-6 rounded-md"
              >
                <dt className="text-lg leading-6 font-semibold text-gray-900 dark:text-gray-100">
                  How do I get started?
                </dt>
                <dd className="mt-2 text-gray-500">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
                  et? Obcaecati, nemo sit. Delectus, totam obcaecati aliquid
                  omnis cumque ex.
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
