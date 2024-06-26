import React, { useState } from 'react'
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import Navbar from '../components/Navbar'
import { scheduleData } from '../data/dummy'


const PropertyPane = (props) => <div className="mt-5">{props.children}</div>

const Scheduler = ({ Calender }) => {
  const [scheduleObj, setScheduleObj] = useState()

  const change = (args) => {
    scheduleObj.selectedDate = args.value
    scheduleObj.dataBind()
  }

  const onDragStart = (arg) => {
    arg.navigation.enable = true
  }

  return (
    <div>
      <div className="justify-center">
        <Navbar pageTitle="Calender" />
        <div className="dark:text-gray-200 dark:bg-secondary-dark-bg ml-4 mr-4 mt-5 mb-10">
          <div className="justify-left">
            <p className="font-semibold text-2xl mb-10">{Calender}</p>
          </div>
        </div>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl">
        <ScheduleComponent
          height="650px"
          ref={(schedule) => setScheduleObj(schedule)}
          selectedDate={new Date()}
          eventSettings={{ dataSource: scheduleData }}
          dragStart={onDragStart}
        >
          <ViewsDirective>
            {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
              <ViewDirective key={item} option={item} />
            ))}
          </ViewsDirective>
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
          />
        </ScheduleComponent>
        <PropertyPane>
          <table style={{ width: '100%', background: 'white' }}>
            <tbody>
              <tr style={{ height: '50px' }}>
                <td style={{ width: '100%' }}>
                  <DatePickerComponent
                    value={new Date()}
                    showClearButton={false}
                    placeholder="Current Date"
                    floatLabelType="Always"
                    change={change}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
    </div>
  )
}

export default Scheduler
