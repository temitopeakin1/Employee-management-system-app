import Navbar from '../components/Navbar'
import print from '../assets/print.png'

const Payslip = () => {
  const downloadPayslip = () => {
    console.log('click')
  }

  return (
    <div className="justify-center text-center">
      <Navbar
        pageTitle={
          <div className="flex flex-col items-center md:flex-row md:items-center">
            <p
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: '600',
                fontSize: '22px',
              }}
              className="font-bold text-2xl md:mr-5 -mt-6 md:-mt-4 pt-1"
            >
              Payslip
            </p>
            <button
              onClick={downloadPayslip}
              className="bg-orange-500 text-white font-bold px-3 pt-1 pb-1 rounded-sm mt-2 md:mt-0"
              style={{
                fontSize: '14px',
                marginLeft: '600px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '50px',
              }}
            >
              <img src={print} alt="Upload" className="mr-2" />
              Download Payslip
            </button>
          </div>
        }
      />
      <div className="justify-center">
        <div className="m-10 md:m-5 pt-5 p-2 md:p-2 bg-white rounded-xl">
          <h2
            className="mt-4 font-satoshi font-lightbold underline"
            style={{ fontSize: '20px' }}
          >
            Payment for the Month of test
          </h2>
          <div classname="grid grid-cols-2 mt-8 gap-4">
            <div className="text-gray-500 font-title mt-8">
              <div>Company name and address</div>
              {/* Add more company information as needed */}
            </div>
            <div classname="mt-4">Earnings</div>
            <div className="container mx-auto mt-8">
              <table className="min-w-full bg-white border border-gray-300">
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="py-2 px-4 border-b">Employee 1</td>
                    <td className="py-2 px-4 border-b">1000</td>
                    <td className="py-2 px-4 border-b">1200</td>
                    <td className="py-2 px-4 border-b">1300</td>
                    <td className="py-2 px-4 border-b">1400</td>
                  </tr>
                  {/* Row 2 */}
                  <tr>
                    <td className="py-2 px-4 border-b">Employee 2</td>
                    <td className="py-2 px-4 border-b">900</td>
                    <td className="py-2 px-4 border-b">1100</td>
                    <td className="py-2 px-4 border-b">1200</td>
                    <td className="py-2 px-4 border-b">1300</td>
                  </tr>
                  {/* Row 3 */}
                  <tr>
                    <td className="py-2 px-4 border-b">Employee 3</td>
                    <td className="py-2 px-4 border-b">1100</td>
                    <td className="py-2 px-4 border-b">1300</td>
                    <td className="py-2 px-4 border-b">1400</td>
                    <td className="py-2 px-4 border-b">1500</td>
                  </tr>
                  {/* Row 4 */}
                  <tr>
                    <td className="py-2 px-4 border-b">Employee 4</td>
                    <td className="py-2 px-4 border-b">1200</td>
                    <td className="py-2 px-4 border-b">1400</td>
                    <td className="py-2 px-4 border-b">1500</td>
                    <td className="py-2 px-4 border-b">1600</td>
                  </tr>
                  {/* Row 5 */}
                  <tr>
                    <td className="py-2 px-4 border-b">Employee 5</td>
                    <td className="py-2 px-4 border-b">950</td>
                    <td className="py-2 px-4 border-b">1100</td>
                    <td className="py-2 px-4 border-b">1200</td>
                    <td className="py-2 px-4 border-b">1300</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payslip
