import React, { useEffect, useState } from "react";
import { RiLineHeight } from "react-icons/ri";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaRegSquare } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiCrystalShine } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { CgSize } from "react-icons/cg";
import { MdOutlineRoundedCorner } from "react-icons/md";
import { FaPersonRunning } from "react-icons/fa6";

const MarbleCalculator = ({ prodPri }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [topOptionChecked, setTopOptionChecked] = useState(false);
  const [edgeOptionChecked, setEdgeOptionChecked] = useState(false);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [quantity, setQuantity] = useState("");
  const [thickness, setThickness] = useState("");
  const [subTotal, setSubTotal] = useState("");
  const [toppoolishtype, settoppoolishtype] = useState("");
  const [toppoolishrate, settoppoolishrate] = useState("");
  const [edgepoolishtype, setedgepoolishtype] = useState("");
  const [edgepoolishrate, setedgepoolishrate] = useState("");
  const [squarefoot, setsquarefoot] = useState("");
  const [runningfoot, setrunningfoot] = useState("");
  const [prodPrice, setprodPrice] = useState("");

  const handleTopOptionChange = () => {
    setTopOptionChecked(!topOptionChecked);
  };

  const handleEdgeOptionChange = () => {
    setEdgeOptionChecked(!edgeOptionChecked);
  };

  const calculateMeasurement = (selectedOption, length, width, quantity) => {
    if (selectedOption === "sqt") {
      // Calculate square foot value and update state
      setsquarefoot(
        (
          (parseFloat(length) * parseFloat(width) * parseFloat(quantity)) /
          144
        ).toFixed(2)
      );
    } else if (selectedOption === "rft") {
      // Calculate running foot value (returning it for now, adjust as needed)
      setrunningfoot(
        ((parseFloat(length) / 12) * parseFloat(quantity)).toFixed(2)
      );
    }
  };

  const calculateProdAmount = (
    selectedOption,
    squarefoot,
    runningfoot,
    prodPri
  ) => {
    if (selectedOption === "sqt") {
      // Calculate square foot value and update state
      setprodPrice(parseInt(parseFloat(squarefoot) * parseFloat(prodPri)));
    } else if (selectedOption === "rft") {
      // Calculate running foot value (returning it for now, adjust as needed)
      setprodPrice(parseInt(parseFloat(runningfoot) * parseFloat(prodPri)));
    }
  };

  const calculateTopPoolishRate = (length, width) => {
    return parseInt(((parseFloat(length) * parseFloat(width)) / 144) * 12);
  };

  const calculateEdgePoolishRate = (length, quantity) => {
    return parseInt((parseInt(length) / 12) * 12 * quantity);
  };

  useEffect(() => {
    if (topOptionChecked) {
      settoppoolishrate(calculateTopPoolishRate(length, width));
    } else {
      settoppoolishrate("");
    }
    if (edgeOptionChecked) {
      setedgepoolishrate(calculateEdgePoolishRate(length, quantity));
    } else {
      setedgepoolishrate("");
    }
  }, [length, width, quantity, topOptionChecked, edgeOptionChecked]);

  useEffect(() => {
    calculateMeasurement(selectedOption, length, width, quantity);
    calculateProdAmount(selectedOption, squarefoot, runningfoot, prodPri);
  }, [
    selectedOption,
    length,
    width,
    quantity,
    squarefoot,
    runningfoot,
    prodPri,
  ]);


  

  useEffect(() => {

    const calculateTotal = () => {
      // ParseInt will return NaN if the value is not a number, so use parseFloat instead
      // Ensure to provide a default value of 0 if the value is falsy
      const edgeRate = parseFloat(edgepoolishrate) || 0;
      const topRate = parseFloat(toppoolishrate) || 0;
      const productPrice = parseFloat(prodPrice) || 0;
    
      setSubTotal(productPrice + topRate + edgeRate);
    };
    
    calculateTotal();
  }, [prodPrice, toppoolishrate, edgepoolishrate]);

  const handleSubmit = () => {
    console.log("helli");
  };

  return (
    <>
      <div className="flex w-full border-b border-gray-500 text-2xl">
        Measurement Type
      </div>
      <div className="flex items-center justify-center space-x-4 w-full ">
        <div>
          <input
            className="hidden"
            id="sqt"
            type="radio"
            name="radio"
            checked={selectedOption === "sqt"}
            onChange={() => setSelectedOption("sqt")}
          />
          <label
            className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer"
            htmlFor="sqt"
          >
            <span className="text-xs font-semibold uppercase">Square Foot</span>
          </label>
        </div>
        <div>
          <input
            className="hidden"
            id="rft"
            type="radio"
            name="radio"
            checked={selectedOption === "rft"}
            onChange={() => setSelectedOption("rft")}
          />
          <label
            className="flex flex-col p-4 border-2 border-gray-400 cursor-pointer"
            htmlFor="rft"
          >
            <span className="text-xs font-semibold uppercase">
              Running Foot
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex w-full border-b border-gray-500 text-2xl">
          Size
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
          <RiLineHeight />
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <AiOutlineColumnWidth />
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Width"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
          <MdOutlineProductionQuantityLimits />
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <CgSize />
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Thickness"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
          />
        </div>
        {selectedOption === "sqt" && (
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
            <FaRegSquare />
            <lable> Square Foot: </lable>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              placeholder="Square Foot"
              value={squarefoot}
              readOnly
            />
          </div>
        )}
        {selectedOption === "rft" && (
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
            <FaPersonRunning />
            <lable> Running Foot </lable>
            <input
              className="pl-2 outline-none border-none"
              type="text"
              name=""
              id=""
              placeholder="Running Foot"
              value={runningfoot}
              readOnly
            />
          </div>
        )}
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
          <GrMoney />
          <lable> Product Amount: </lable>
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Product Amount"
            value={prodPrice}
            readOnly
          />
        </div>

        <div className="flex w-full border-b border-gray-500 text-2xl">
          Poolish
        </div>
        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
          <ul className="flex w-full justify-evenly">
            <li>
              <input
                type="checkbox"
                id="Top-option"
                value=""
                className="hidden peer"
                required=""
                checked={topOptionChecked}
                onChange={handleTopOptionChange}
              />
              <label
                htmlFor="Top-option"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-black  peer-checked:text-gray-600"
              >
                <div className="block">
                  <GiCrystalShine className="w-7 h-7" />{" "}
                  <div className="w-full text-lg font-semibold">
                    Top Poolish
                  </div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="checkbox"
                id="Edge-option"
                value=""
                className="hidden peer"
                required=""
                checked={edgeOptionChecked}
                onChange={handleEdgeOptionChange}
              />
              <label
                htmlFor="Edge-option"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:border-black  peer-checked:text-gray-600"
              >
                <div className="block">
                  <MdOutlineRoundedCorner className="w-7 h-7" />{" "}
                  <div className="w-full text-lg font-semibold">
                    Edge Poolish
                  </div>
                </div>
              </label>
            </li>
          </ul>
        </div>
        {topOptionChecked && (
          <>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
              <GiCrystalShine />
              <select
                className="pl-2 outline-none border-none w-full"
                name=""
                id=""
                value={toppoolishtype}
                onChange={(e) => settoppoolishtype(e.target.value)}
              >
                <option value="" disabled>
                  Select Top Poolish Type
                </option>
                <option value="tLeather">Leather Poolish</option>
                <option value="tAntique">Antique Poolish</option>
                <option value="tGlossy">Glossy</option>
              </select>
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
              <GrMoney />
              <lable> Top Poolish Amount: </lable>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Top Poolish Amount"
                value={toppoolishrate}
                readOnly
              />
            </div>
          </>
        )}

        {edgeOptionChecked && (
          <>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
              <MdOutlineRoundedCorner />
              <select
                className="pl-2 outline-none border-none w-full"
                name=""
                id=""
                value={edgepoolishtype}
                onChange={(e) => setedgepoolishtype(e.target.value)}
              >
                <option value="" disabled>
                  Select Edge Poolish Type
                </option>
                <option value="eLeather">Leather Poolish</option>
                <option value="eAntique">Antique Poolish</option>
                <option value="eGlossy">Glossy</option>
              </select>
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
              <GrMoney />
              <lable> Edge Poolish Amount: </lable>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name=""
                id=""
                placeholder="Edge Poolish Total"
                value={edgepoolishrate}
                readOnly
              />
            </div>
          </>
        )}

        <div className="flex items-center border-2 py-2 px-3 rounded-2xl mt-2 mb-4">
          <GrMoney />
          <input
            className="pl-2 outline-none border-none"
            type="text"
            name=""
            id=""
            placeholder="Sub Total"
            value={subTotal}
            readOnly
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default MarbleCalculator;
