import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Report = () => {
  const reportRef = useRef(null);

  const [name, setName] = useState("Roopace");
  const [address, setAddress] = useState("Kathmandu, Nepal");

  const [spareParts, setSpareParts] = useState([]);

  function removeSparepart(index) {
    setSpareParts((prevState) => {
      const updatedSpareParts = [...prevState];
      updatedSpareParts.splice(index, 1);
      return updatedSpareParts;
    });
  }

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, quantity, price } = formData;

    if (name && quantity && price) {
      const newSparePart = {
        name,
        quantity: parseInt(quantity),
        price: parseInt(price),
      };

      setSpareParts((prevState) => [...prevState, newSparePart]);
      setFormData({
        name: "",
        quantity: "",
        price: "",
      });
    }
  };

  const handleGenerateReport = () => {
    const reportElement = reportRef.current;

    html2canvas(reportElement).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");

      const aspectRatio = canvas.width / canvas.height;

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdfWidth / aspectRatio;

      pdf.addImage(imageData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`report${new Date().getTime()}.pdf`);
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Name
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter user name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Address
          </label>
          <input
            className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter Address"
          />
        </div>
        <div class="w-full">
          <label className=" text-gray-700 mb-2 font-bold">Add Spare</label>
          <form className=" rounded flex " onSubmit={handleSubmit}>
            <input
              className="appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
            <input
              className="appearance-none border rounded w-1/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              type="number"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
      <div ref={reportRef} className="p-20">
        <h1 className="p-3 text-4xl">Customer Report</h1>
        <div className="p-3">
          <p>
            <b>Full Name: </b> {name}
          </p>
          <p>
            <b>Address:</b> {address}
          </p>
          <p>
            <b>Date:</b> {getCurrentDate()}
          </p>
        </div>
        <table className="min-w-full mt-8 bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                S.N.
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Spare Name
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Quantity
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Price
              </th>
              <th className="p-3 font-medium text-left bg-blue-600 text-white border border-gray-300">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((part, index) => (
              <tr key={index} className={"text-center"}>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {index + 1}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part.name}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part.quantity}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {part?.price}
                </td>
                <td className="p-3 text-sm font-medium text-gray-800 border border-gray-300">
                  {/* {part?.price} */}
                  <button
                    className={""}
                    onClick={(e) => removeSparepart(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <div className="text-xl">
          Total price :
          {spareParts.reduce(
            (acc, curr) => (acc += curr.price * curr.quantity),
            0
          )}
        </div>
        <br />
      </div>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleGenerateReport}
      >
        Generate Report
      </button>
    </div>
  );
};

export default Report;
