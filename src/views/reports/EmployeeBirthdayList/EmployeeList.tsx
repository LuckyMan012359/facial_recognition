import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import EmployeeListTable from './components/EmployeeListTable'
import EmployeeListActionTools from './components/EmployeeListActionTools'

const EmployeeList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Employee Birthdays</h3>
                            <EmployeeListActionTools />
                        </div>
                        <EmployeeListTable />
                    </div>
                </AdaptiveCard>
            </Container>
        </>
    )
}

export default EmployeeList
