import { useState } from 'react';

const useFormState = initialState => {
  const [state, setState] = useState(initialState);

  const setField = (field, value) => {
    setState(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return [state, setField];
};

export default useFormState;
