import React from 'react'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'

const HistoryPage = () => {

  const userData = useSelector(state => state.user?.userData);

  return (
    <section>

      {/* Header */}
      <div className='text-center m-7'>
        <h2 className='text-2xl'>주문 내역</h2>
      </div>

      {/* HistoryList */}
      <table className='w-full text-sm text-left text-gray-500'>
        <thead className='border-[1px]'>
            <tr>
              <th>
                주문번호
              </th>
              <th>
                가격
              </th>
              <th>
                수량
              </th>
              <th>
                주문 날짜
            </th>
            </tr>
        </thead>

        <tbody>
        {userData?.history.map(item => (
          <tr className='border-b' key={item.id}>
            <td>{item.id}</td>
            <td>{item.price}원</td>
            <td>{item.quantity}</td>
            <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:MM')}</td>
          </tr>
        ))}
        </tbody>
      </table>

    </section>
  )
}

export default HistoryPage
