import { useState,useEffect } from 'react';

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

  const getRandomColor = () =>
    `rgb(${Math.round(Math.random() * (255 - 0) + 1)}, ${Math.round(
      Math.random() * (255 - 0) + 1
    )}, ${Math.round(Math.random() * (255 - 0) + 1)})`;

  
  
    const [inputValue, setInputValue] = useState([]);
    const [pipes, setPipes] = useState([]);
  
    useEffect(() => {
      setPipes(inputValue.filter(Boolean).map(pipe => parseInt(pipe.trim(), 10)));
    }, [inputValue]);
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      const values = value.split(',').map(v => v.trim()); // убираем пробелы вокруг значений
      setInputValue(values);
    };
  
    return (
      <div>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <div style={{ display: 'flex', flexDirection: 'wrap-reverse', flexWrap: 'wrap' }}>
  {pipes.map((pipe) => (
    <div key={getRandomColor()} style={{ backgroundColor: 'green', width: '50px', border: '1px dashed red', height: `${20 * pipe}px` }}>
      {pipe}
    </div>
  ))}
</div>

      </div>
    );
  };
  

// const [inputValue, setInputValue] = useState('');
//   const [pipes, setPipes] = useState([]);

//   useEffect(() => {
//     setPipes(inputValue.map(pipe => Number(pipe))); // обновляем состояние pipes при изменении inputValue
//   }, [inputValue]);

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     const values = value.split(',').map(v => v.trim()); // убираем пробелы вокруг значений
//     setInputValue(values);
//   };

//   return (
//     <div>
//       <form>
//         <input type="text" value={inputValue} onChange={handleInputChange} />
//       </form>
//       <div>
//         {pipes.map((pipe) => (
//           <div key={getRandomColor()} style={{ backgroundColor: 'green', width: '50px', border: '1px dashed red', height: `${20 * pipe}px` }}>
//             {pipe}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };




