import { useState, useEffect } from 'react';

interface UseFormReturn {
  values: any;
  errors: any;
  handleChange: (event: any) => void;
  validateOn: any;
}

interface UseForm {
  validate?: Function;
  initialValues?: any;
  onSubmit?: any;
}

const useForm = ({ validate, initialValues, onSubmit }: UseForm): UseFormReturn => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // If initial values are provided - Init Form
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, []);


  const validateOn = event => {
    console.log("HMM")
    event.preventDefault();
    if (validate) {
      const result = validate(values);
      setErrors(result);
      if (event.type === 'submit' && Object.keys(result).length === 0) {
        onSubmit();
      }
    } else {
      setErrors({});
      if (event.type === 'submit') {
        onSubmit();
      }
    }
  };

  const handleChange = event => {
    event.persist();
    const { id, value } = event.target;
    // Update value for field updated
    setValues({
      ...values,
      [id]: value,
    });
    // Remove error on field being updated
    setErrors({
      ...errors,
      [id]: '',
    });
  };

  return {
    handleChange,
    validateOn,
    values,
    errors,
  };
};

export default useForm;
