import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateForm, submitForm } from '../redux/formSlice';
import SignatureCanvas from 'react-signature-canvas';
import StarRating from './StarRating';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FeedbackForm = () => {
    const dispatch = useDispatch();
    const formState = useSelector(state => state.form);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const signatureRef = React.useRef(null);

    const todayDate = formState.todayDate || new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const selectedProducts = new Set(formState.products);
            if (checked) {
                selectedProducts.add(value);
            } else {
                selectedProducts.delete(value);
            }
            dispatch(updateForm({ name, value: Array.from(selectedProducts) }));
        } else {
            dispatch(updateForm({ name, value }));
        }
    };

    const handleStarChange = (name) => (value) => {
        dispatch(updateForm({ name, value }));
    };

    const handleSignature = () => {
        if (signatureRef.current) {
            const signatureData = signatureRef.current.toDataURL('image/png'); // Generate URL
            dispatch(updateForm({ name: 'signature', value: signatureData }));
        }
    };

    const handleClearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSignature();
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (isSubmitting) {
            const validateAndSubmit = async () => {
                // validation and obj creation
                await dispatch(submitForm({ ...formState }));

                console.log(formState.containValError);
                if (formState.containValError === 'false') {
                    try {
                        // Make API request
                        const response = await fetch('http://localhost:5000/feedback', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ ...formState }),
                        });

                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const result = await response.json();
                        toast.success('Form submitted successfully!');
                        // Clear the form after successful submission
                        Object.keys(formState).forEach(key => {
                            dispatch(updateForm({ name: key, value: '' }));
                        });
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        toast.error('Failed to submit the form. Please try again.');
                    }
                }

                setIsSubmitting(false);
            };

            validateAndSubmit();
        }
    }, [isSubmitting, dispatch, formState]);

    return (
        <div className="max-w-5xl mx-auto px-16 py-7 bg-white rounded-md mt-9">
            <form onSubmit={handleSubmit} className="space-y-4">
                <h1 className='text-center text-2xl'>Purchase Feedback Form</h1>
                <div className="grid grid-cols-2 gap-3">
                    <input
                        autoComplete='off'
                        type="text"
                        name="fullName"
                        value={formState.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="p-2 border border-gray-300 rounded col-span-2"
                    />
                    <input
                        autoComplete='off'
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="p-2 border border-gray-300 rounded col-span-2"
                    />
                    <div className='col-span-1'></div>
                    <input
                        autoComplete='off'
                        type="tel"
                        name="phoneNumber"
                        value={formState.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="p-2 border border-gray-300 rounded"
                    />
                    <div className="flex items-center space-x-2">
                        <label className="w-40 text-lg">Purchase Date:</label>
                        <input
                            readOnly
                            type="date"
                            name="todayDate"
                            value={formState.todayDate || todayDate}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded flex-grow"
                        />
                    </div>
                    <div className="col-span-3 mt-7"></div>
                    <div className="flex flex-col md:flex-row items-start md:items-center space-x-2">
                        <label className="w-40 text-lg">Choose Product(s):</label>
                        <div className="flex flex-col space-y-2 overflow-auto w-[55%]" style={{ maxHeight: '100px' }}>
                            {["product 1", "product 2", "product 3", "product 4", "product 5", "product 6", "product 7"].map(product => (
                                <label key={product} className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="products"
                                        value={product}
                                        checked={formState.products.includes(product)}
                                        onChange={handleChange}
                                        className="mr-2 cursor-pointer"
                                    />
                                    {`${product}`}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className=" mb-2 text-lg font-semibold col-span-2 flex">Selected Products:</label>
                        <textarea
                            name="selectedProducts"
                            value={(Array.isArray(formState.products) ? formState.products.join(', ') : '')}
                            readOnly
                            className="p-2 border border-none col-span-2 w-full cursor-default"
                        />
                    </div>
                    <textarea
                        name="feedback"
                        value={formState.feedback}
                        onChange={handleChange}
                        placeholder="Write your feedback here..."
                        className="p-2 border border-gray-300 rounded col-span-3 h-36"
                    />
                    <div className='col-span-3 mt-7'></div>
                    <div className="flex flex-col space-y-4 col-span-1">
                        <div>
                            <label className="block mb-2 text-lg">Quality of the product:</label>
                            <StarRating
                                rating={formState.productQuality || 0}
                                onChange={handleStarChange('productQuality')}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg">Staff Friendliness:</label>
                            <StarRating
                                rating={formState.staffFriendliness || 0}
                                onChange={handleStarChange('staffFriendliness')}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-lg">Overall Experience:</label>
                            <StarRating
                                rating={formState.overallExperience || 0}
                                onChange={handleStarChange('overallExperience')}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 border-2 border-gray-300 p-2 rounded relative">
                        <label className="block mb-2">Signature:</label>
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{ width: 390, height: 210, className: 'signature-pad' }}
                        />
                        <button
                            type="button"
                            onClick={handleClearSignature}
                            className="absolute top-2 right-2 px-3 py-1 bg-blue-600 hover:bg-red-600 text-white rounded"
                        >
                            Clear
                        </button>
                    </div>
                </div>
                {formState.errors && Object.keys(formState.errors).length > 0 && (
                    <div className="text-red-600">
                        {Object.values(formState.errors).map((error, index) => (
                            <div key={index}>{error}</div>
                        ))}
                    </div>
                )}
                <div className="flex justify-center">
                    <button type="submit" className="px-5 py-2 mt-3 bg-blue-600 hover:bg-red-600 text-lg text-white rounded">Submit</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default FeedbackForm;
