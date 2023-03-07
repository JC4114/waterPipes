import { nanoid } from 'nanoid';
import { useState } from 'react';

function water(arr) {
  let count = 0;
  const waterForEachPipe = [];

  while (arr.some(el => el > 0)) {
    const max = Math.max(...arr);
    const firstMax = arr.indexOf(max);
    const lastMax = arr.lastIndexOf(max);

    arr[lastMax]--;
    if (firstMax !== lastMax) {
      for (let i = firstMax; i < lastMax; i++) {
        if (arr[i] === max) arr[i]--;
        else {
          count++;
          waterForEachPipe[i] = (waterForEachPipe[i] || 0) + 1;
        }
      }
    }
  }

  return { count, waterForEachPipe };
}

export const App = () => {
  const [inputValue, setInputValue] = useState([]);
  const [pipes, setPipes] = useState([]);
  const [waterCount, setWaterCount] = useState(0);
  const [waterForEachPipe, setWaterForEachPipe] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const values = value.split(',').map(v => v.trim()); // убираем пробелы вокруг значений
    setInputValue(values);
    const newPipes = values.filter(Boolean).map((pipe) => parseInt(pipe.trim(), 10));
    const result = water(newPipes.slice());
    setPipes(newPipes);
    setWaterCount(result.count);
    setWaterForEachPipe(result.waterForEachPipe);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        {pipes.map((pipe, index) => (
          <div
            key={nanoid(4)}
            style={{
              position: "relative",
              backgroundColor: 'green',
              width: '50px',
              border: '1px dashed red',
              height: `${20 * pipe}px`,
            }}
          >
            <div style={{color: "blue", position: "absolute", top: "-20px"}}>
              {waterForEachPipe[index]}
            </div>
            <div style={{position: "absolute", top: "0"}}>
              {pipe}
            </div>
          </div>
        ))}
      </div>
      <div>Количество воды:  {waterCount}</div>
    </div>
  );
};
