import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Validation helper function
const validateForm = (form) => {
  const errors = {};
  if (!form.fullName) errors.fullName = 'Full Name is required';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid Email is required';
  if (!form.phoneNumber || !/^\d{10}$/.test(form.phoneNumber)) errors.phoneNumber = 'Valid Phone Number is required';
  if (form.products.length === 0) errors.products = 'At least one product must be selected';
  if (!form.feedback) errors.feedback = 'The feedback description cannot be empty';
  if (!form.productQuality) errors.productQuality = 'Product Quality rating is required';
  if (!form.staffFriendliness) errors.staffFriendliness = 'Staff Friendliness rating is required';
  if (!form.overallExperience) errors.overallExperience = 'Overall Experience rating is required';
  // if (!form.signature) errors.signature = 'Signature is required';

  // Check if the errors object is empty or contains values
  form.containValError = Object.keys(errors).length > 0 ? 'true' : 'false';

  return errors;
};

export const formSlice = createSlice({
  name: 'form',
  initialState: {
    fullName: '',
    email: '',
    phoneNumber: '',
    feedback: '',
    productQuality: '',
    staffFriendliness: '',
    overallExperience: '',
    signature: '',
    products: [],
    todayDate: '',
    errors: {},
    containValError: '',
  },
  reducers: {
    updateForm: (state, action) => {
      state[action.payload.name] = action.payload.value;
      state.errors = {}; // Clear errors on input change
    },
    submitForm: (state, action) => {
      const errors = validateForm(state);
      state.containValError = Object.keys(errors).length > 0 ? 'true' : 'false';

      if (Object.keys(errors).length > 0) {
        state.errors = errors;
      } else {
        console.log('Form validation passed - object created', action.payload);
      }
    },
  },
});

export const { updateForm, submitForm } = formSlice.actions;
export default persistReducer(
  { key: 'form', storage },
  formSlice.reducer
);
