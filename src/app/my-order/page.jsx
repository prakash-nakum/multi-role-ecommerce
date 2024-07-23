'use client'

import Container from '@/components/shared/Container'
import Main from '@/components/shared/layouts/Main'
import React from 'react'
import { useSelector } from 'react-redux'

const MyOrder = () => {
    const { user } = useSelector((state) => state.auth)
    return (
        <Main>
            <Container >
                <div className='m-5'>
                    <h1>
                        MyOrder
                    </h1>
                </div>
                <div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Index
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Transaction Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Paid amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delivered
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.orders && user?.orders?.length > 0 && user?.orders.map((item, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item?.merchantTransactionId || item?.razorpay_payment_id}
                                        </td>

                                        <td className="px-6 py-4">
                                            {item?.amount / 100}
                                        </td>
                                        <td className="px-6 py-4">
                                            Pending
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>


            </Container>
        </Main>
    )
}

export default MyOrder