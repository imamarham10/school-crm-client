import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';

const Form = ({ model, onSubmit, validationSchema }) => {
  const initialValues = model.fields.reduce((acc, field) => {
    acc[field.name] = field.type === 'checkbox' ? false : '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm className="space-y-4">
          {model.fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'checkbox' ? (
                <Field
                  type={field.type}
                  name={field.name}
                  className="mt-1"
                />
              ) : (
                <Field
                  type={field.type}
                  name={field.name}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
