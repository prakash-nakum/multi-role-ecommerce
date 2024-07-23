'use client'

import Container from '@/components/shared/Container'
import Main from '@/components/shared/layouts/Main'
import { addUser } from '@/features/auth/authSlice'
import { usePersistLoginQuery } from '@/services/auth/authApi'
import { useCodPayMutation, useRazorPayMutation } from '@/services/user/userApi'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

const Payment = () => {

    const { user } = useSelector((state) => state.auth)
    const accessToken = useSelector((state) => state.accesstoken.token)
    const [fechuser, setFetchUser] = useState(false)
    const [codstate, setCodstate] = useState(false)
    const [paymentType, setPaymentType] = useState(null)
    const router = useRouter();
    const dispatch = useDispatch();

    const { data: userData, isError: userError } = usePersistLoginQuery(accessToken);
    const userdetails = useMemo(() => userData?.data || {}, [userData]);


    //get cart total price
    const totalPrice = user?.cart?.reduce((acc, item) => {
        const itemTotal = item?.product.price * item?.quantity;
        return acc + itemTotal;
    }, 0);
    const razorkeyID = 'rzp_test_WDehbAlq2VAj4E'
    //payment by phonepay 
    const handlePhonepayPayment = async () => {
        const phonePaydata = {
            transactionID: "T" + Date.now(),
            MUID: "MUID" + Date.now(),
            amount: totalPrice * 100,
            userId: user?._id,
            number: "1234567890",
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/phonepay`, phonePaydata)

            if (res.status === 200) {
                window.location.href = res.data.redirectUrl
            }
        } catch (error) {
            console.log(error);
        }
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    //payment by razorpay 
    async function handleRazorpayPayment() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        try {
            const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/payment/orderid`, {
                amount: totalPrice,
                currency: "INR",
            });

            if (!result) {
                alert("Server error. Are you online?");
                return;
            }
            initPayment(result.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const [razorPay, { data: codResponse, isLoading: paymnetPending, error }] =
        useRazorPayMutation();


    const [codPay, { data: codPaymentData, isSuccess: codPaymentisSuccess, isLoading: codPaymnetPending, isError: codPaymentError }] = useCodPayMutation();


    const initPayment = (data) => {
        const options = {
            key: razorkeyID,
            amount: data.amount,
            currency: data.currency,
            name: user?.name,
            description: "Test Transaction",
            order_id: data.id,
            handler: async (response) => {
                try {
                    const result = await razorPay({
                        body: {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userid: user?._id,
                            amount: totalPrice
                        },
                    });
                    console.log(result);
                    if (result?.data?.status === 1) {
                        toast.success(result.data.message);
                        router.push('/success')
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#3399cc",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open()


    };


    //pay with COD
    const handleCODPayment = async () => {
        try {
            const result = await codPay({
                body: {
                    amount: totalPrice,
                    userid: user?._id,
                    product: user?.cart
                },
            });
            if (result?.data?.status === 1) {
                toast.success(result.data.message);
                router.push('/success')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePayment = () => {
        if (!paymentType) {
            return toast("Please select payment type")
        }
        switch (paymentType) {
            case "phonepay":
                handlePhonepayPayment();
                break;
            case "razorpay":
                handleRazorpayPayment();
                break;
            case "cod":
                handleCODPayment();
                break;
            default:
                return toast.loading('Waiting...');
        }
    }

    return (
        <Main>
            <Container className="flex flex-col gap-y-12 py-8">
                <div>
                    <h1>Payment</h1>
                </div>
                {Object.keys(user).length === 0 || user?.cart?.length === 0 || !accessToken ? (
                    <>No Products Added!</>
                ) : (
                    <div>


                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                onChange={() => setPaymentType("phonepay")}
                                id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Pay with Phonepay
                            </label>
                        </div>
                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                onChange={() => setPaymentType("razorpay")}
                                id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Pay with Razorpay
                            </label>
                        </div>

                        <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <input
                                onChange={() => setPaymentType("cod")}
                                id="bordered-radio-cod" type="radio" value='' name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label for="bordered-radio-cod" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Pay with COD
                            </label>
                        </div>
                        <div className='mt-3'>
                            {/* <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            > */}
                            <button
                                onClick={handlePayment}
                                type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">

                                Pay Now
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </Main >
    )
}

export default Payment