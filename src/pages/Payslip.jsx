import Navbar from '../components/Navbar'
import upload from '../assets/upload.png'

const Payslip = () => {
  const downloadPayslip = () => {
    console.log('click')
  }

  return (
    <div className="justify-center">
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
              className="bg-orange-500 text-white font-bold px-4 pt-1 pb-1 rounded-sm mt-2 md:mt-0"
              style={{
                fontSize: '14px',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '10px',
              }}
            >
              <img src={upload} alt="Upload" className="mr-4" />
              Download Payslip
            </button>
          </div>
        }
      />
    </div>
  )
}

export default Payslip
