import React, {useState} from 'react';

function TextInput(props) {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    props.addItem(value);
    setValue('');
  };

  return (
    <div>
      <input type='text' value={value} onChange={handleChange} />
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default TextInput;
