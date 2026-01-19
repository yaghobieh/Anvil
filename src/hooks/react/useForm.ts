import { useState, useCallback, useRef, useMemo } from 'react';
import type {
  FormValues,
  FormErrors,
  FormTouched,
  ValidationRules,
  UseFormReturn,
  ValidationRule,
} from '../../types';

/**
 * Hook for form state management
 * @param initialValues - Initial form values
 * @param validationRules - Validation rules
 * @returns Form state and actions
 */
export function useForm<T extends FormValues>(
  initialValues: T,
  validationRules?: ValidationRules<T>
): UseFormReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrorsState] = useState<FormErrors<T>>({});
  const [touched, setTouchedState] = useState<FormTouched<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValuesRef = useRef(initialValues);

  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);
  }, [values]);

  const validateField = useCallback(
    (field: keyof T, value: T[keyof T]): string | undefined => {
      if (!validationRules || !validationRules[field]) return undefined;

      const rules = validationRules[field];
      const ruleArray = Array.isArray(rules) ? rules : [rules];

      for (const rule of ruleArray as ValidationRule[]) {
        if (!rule.validate(value, values)) {
          return rule.message;
        }
      }

      return undefined;
    },
    [validationRules, values]
  );

  const validateAll = useCallback((): FormErrors<T> => {
    const newErrors: FormErrors<T> = {};

    for (const field of Object.keys(values) as (keyof T)[]) {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    return newErrors;
  }, [values, validateField]);

  const isValid = useMemo(() => {
    return Object.keys(validateAll()).length === 0;
  }, [validateAll]);

  const setValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]): void => {
      setValuesState((prev) => ({ ...prev, [field]: value }));
      const error = validateField(field, value);
      setErrorsState((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [validateField]
  );

  const setValues = useCallback((newValues: Partial<T>): void => {
    setValuesState((prev) => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback(<K extends keyof T>(field: K, error: string): void => {
    setErrorsState((prev) => ({ ...prev, [field]: error }));
  }, []);

  const setTouched = useCallback(<K extends keyof T>(field: K, isTouched: boolean = true): void => {
    setTouchedState((prev) => ({ ...prev, [field]: isTouched }));
  }, []);

  const reset = useCallback((newValues?: Partial<T>): void => {
    setValuesState({ ...initialValuesRef.current, ...newValues });
    setErrorsState({});
    setTouchedState({});
    setIsSubmitting(false);
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors = validateAll();
    setErrorsState(newErrors);

    const allTouched: FormTouched<T> = {};
    for (const field of Object.keys(values) as (keyof T)[]) {
      allTouched[field] = true;
    }
    setTouchedState(allTouched);

    return Object.keys(newErrors).length === 0;
  }, [validateAll, values]);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void | Promise<void>) =>
      async (e?: Event): Promise<void> => {
        if (e) {
          e.preventDefault();
        }

        if (!validate()) return;

        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      },
    [validate, values]
  );

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    isSubmitting,
    setValue,
    setValues,
    setError,
    setTouched,
    reset,
    validate,
    handleSubmit,
  };
}

/**
 * Hook for a single input field
 * @param initialValue - Initial value
 * @param validator - Validation function
 * @returns Field state and handlers
 */
export function useField<T>(
  initialValue: T,
  validator?: (value: T) => string | undefined
): {
  value: T;
  error: string | undefined;
  touched: boolean;
  onChange: (value: T) => void;
  onBlur: () => void;
  reset: () => void;
} {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  const onChange = useCallback(
    (newValue: T): void => {
      setValue(newValue);
      if (validator) {
        setError(validator(newValue));
      }
    },
    [validator]
  );

  const onBlur = useCallback((): void => {
    setTouched(true);
    if (validator) {
      setError(validator(value));
    }
  }, [validator, value]);

  const reset = useCallback((): void => {
    setValue(initialValue);
    setError(undefined);
    setTouched(false);
  }, [initialValue]);

  return { value, error, touched, onChange, onBlur, reset };
}

/**
 * Common validation rules factory
 * @returns Object with validation rule creators
 */
export const validators = {
  required: (message: string = 'This field is required'): ValidationRule => ({
    validate: (value) => value !== null && value !== undefined && value !== '',
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value) => typeof value === 'string' && value.length >= min,
    message: message || `Minimum ${min} characters required`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value) => typeof value === 'string' && value.length <= max,
    message: message || `Maximum ${max} characters allowed`,
  }),

  email: (message: string = 'Invalid email address'): ValidationRule => ({
    validate: (value) =>
      typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),

  pattern: (regex: RegExp, message: string = 'Invalid format'): ValidationRule => ({
    validate: (value) => typeof value === 'string' && regex.test(value),
    message,
  }),

  min: (minValue: number, message?: string): ValidationRule => ({
    validate: (value) => typeof value === 'number' && value >= minValue,
    message: message || `Value must be at least ${minValue}`,
  }),

  max: (maxValue: number, message?: string): ValidationRule => ({
    validate: (value) => typeof value === 'number' && value <= maxValue,
    message: message || `Value must be at most ${maxValue}`,
  }),

  custom: <T>(validate: (value: T) => boolean, message: string): ValidationRule<T> => ({
    validate,
    message,
  }),
};

