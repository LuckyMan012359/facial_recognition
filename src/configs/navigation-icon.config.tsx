import { PiHouseLineDuotone } from 'react-icons/pi'
import { IoSettings } from 'react-icons/io5'
import {
    FaUsers,
    FaRegClock,
    FaRegCalendarAlt,
    FaChartBar,
    FaRegUserCircle,
    FaRegCalendarPlus,
} from 'react-icons/fa'
import type { JSX } from 'react'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    dashboardDashboard: <PiHouseLineDuotone />,
    dashboardEmployees: <FaUsers />,
    dashboardAttendance: <FaRegClock />,
    dashboardSchedule: <FaRegCalendarAlt />,
    dashboardLeave: <FaRegCalendarPlus />,
    dashboardReports: <FaChartBar />,
    dashboardUsers: <FaRegUserCircle />,
    dashboardSetting: <IoSettings />,
}

export default navigationIcon
