import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ScheduleListTable from './components/ScheduleListTable'
import CustomersListTableTools from './components/ScheduleListTableTools'
import ScheduleListSelected from './components/ScheduleListSelected'

const ScheduleList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <h3>Schedules</h3>
                        </div>
                        <CustomersListTableTools />
                        <ScheduleListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <ScheduleListSelected />
        </>
    )
}

export default ScheduleList
