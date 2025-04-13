/** @format */

import React, { useCallback, useEffect } from "react";
import BtnFilter from "./BtnFilter";

interface Props {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
  width?: string;
}

const PriceFilter: React.FC<Props> = ({
  min,
  max,
  onChange,
  width = "100%",
}) => {
  const [isActive, setIsActive] = React.useState(false);
  const [minVal, setMinVal] = React.useState(min);
  const [maxVal, setMaxVal] = React.useState(max);
  const minValRef = React.useRef(min);
  const maxValRef = React.useRef(max);
  const range = React.useRef(null);

  const getPercentage = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercentage(minVal);
    const maxPercent = getPercentage(maxValRef.current);

    if (range.current) {
      (range.current as HTMLInputElement).style.left = `${minPercent}%`;
      (range.current as HTMLInputElement).style.width = `${
        maxPercent - minPercent
      }%`;
    }
  }, [minVal, getPercentage]);

  useEffect(() => {
    const minPercent = getPercentage(minValRef.current);
    const maxPercent = getPercentage(maxVal);

    if (range.current) {
      (range.current as HTMLInputElement).style.width = `${
        maxPercent - minPercent
      }%`;
    }
  }, [maxVal, getPercentage]);

  useEffect(() => {
    if (minVal != minValRef.current || maxVal != maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className='w-full flex flex-col gap-10'>
      <BtnFilter
        isActive={isActive}
        handleClick={() => setIsActive(!isActive)}
        text='price'
      />
      {isActive && (
        <div className='w-full flex relative flex-col space-y-14'>
          {/* Style the price range slider */}
          <div className='' style={{ width }}>
            <input
              type='range'
              min={min}
              max={max}
              value={minVal}
              onChange={(event) => {
                const value = Math.min(Number(event.target.value), maxVal - 1);
                setMinVal(value);
              }}
              className='thumb thumb-left'
              style={{
                width,
                zIndex: minVal > max - 100 || minVal === maxVal ? 5 : undefined,
              }}
            />

            <input
              type='range'
              min={min}
              max={max}
              value={maxVal}
              onChange={(event) => {
                const value = Math.max(Number(event.target.value), minVal + 1);
                setMaxVal(value);
              }}
              className='thumb thumb-right'
              style={{
                width,
                zIndex: minVal > max - 100 || minVal === maxVal ? 4 : undefined,
              }}
            />

            <div className='slider'>
              <div
                style={{ backgroundColor: "#cecece" }}
                className='track-slider'
              />
              <div
                ref={range}
                style={{ backgroundColor: "rgb(255 125 61)" }}
                className='range-slider'
              />
            </div>
            {/* Display Price Value */}
            <div className='w-full px-4 flex items-center justify-between gap-x-5 mt-10'>
              <p className='text-lg border border-gray-400 rounded-md px-2 w-24 bg-gray-100 dark:bg-gray-800 text-start py-1 dark:text-neutral-100 font-semibold'>
                $ {minVal}
              </p>

              <div className='flex-1 border border-neutral-500 mt-1'></div>

              <p className='text-lg border border-gray-400 rounded-md px-2 w-24 bg-gray-100 dark:bg-gray-800 text-start py-1 dark:text-neutral-100 font-semibold'>
                $ {maxVal}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
