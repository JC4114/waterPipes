
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

function water(arr) {
  let count = 0;

  while (arr.some(el => el > 0)) {
    const max = Math.max(...arr);
    const firstMax = arr.indexOf(max);
    const lastMax = arr.lastIndexOf(max);

    arr[lastMax]--;
    if (firstMax !== lastMax) {
      for (let i = firstMax; i < lastMax; i++) {
        if (arr[i] === max) arr[i]--;
        else count++;
      }
    }
  }

  return count;
}


export const App = () => {
  const [inputValue, setInputValue] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [waterCount, setWaterCount] = useState(0);

  useEffect(() => {
    setPipes(
      inputValue
        .filter(Boolean)
        .map((pipe) => parseInt(pipe.trim(), 10))
    );
  }, [inputValue]);

  useEffect(() => {
    setWaterCount((prevCount) => water(pipes));
  }, [pipes]);

  useEffect(() => {
    const count = water(pipes);
    console.log("Water count:", count);
    setWaterCount(count);
  }, [pipes]);

  const handleInputChange = (event) => {
  const value = event.target.value;
  const values = value.split(',').map(v => v.trim()); // убираем пробелы вокруг значений
  setInputValue(values);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        {pipes.map((pipe) => (
          <div
            key={nanoid(4)}
            style={{
              backgroundColor: 'green',
              width: '50px',
              border: '1px dashed red',
              height: `${20 * pipe}px`,
            }}
          >
            {pipe}
          </div>
        ))}
      </div>
      <div>Колличество воды:  {waterCount}</div>
    </div>
  );
};

