import { useState, useEffect } from 'react';

const useForm = (cb, validate) => {
  // Keep track of form values
  const [values, setValues] = useState<any>({});
  // Keep track of form errors
  const [errors, setErrors] = useState<any>({});
  // Prevent submit on render
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      cb(values);
    }
  }, [errors]);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(values));
  };

  const handleChange = event => {
    event.persist();
    /* tslint:disable */
    setValues((values: any) => ({
      ...values,
      [event.target.id]: event.target.value,
    }));
    delete errors[event.target.id];
    setErrors(errors);
    /*tslint:enable*/
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
