import { useMemo, useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import useLeaveList from '../hooks/useLeaveList'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import { TbPencil } from 'react-icons/tb'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { Leave } from '../types'
import type { TableQueries } from '@/@types/common'
import LeaveDataTable from '@/components/shared/LeaveDataTable'
import { Button, Dialog, Tag } from '@/components/ui'
import { RiMessage2Fill } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'

const statusColor: Record<string, string> = {
    Approved:
        'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    Declined: 'bg-[#ff4d4d] dark:bg-[#ff4d4d] text-black dark:text-black',
    Pending: 'bg-red-300 dark:bg-red-300 text-gray-900 dark:text-gray-900',
}

const ActionColumn = ({
    onEdit,
    data,
}: {
    onEdit: () => void
    data: Leave
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openDialog = () => {
        setIsModalOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsModalOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsModalOpen(false)
    }

    const formatDate = (date: string) => {
        const dateObj: Date = new Date(date)

        const formattedDate: string = new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }).format(dateObj)

        return formattedDate
    }

    return (
        <div className="flex gap-3 items-center">
            {data.status === 'Approved' ? (
                <Tooltip title="View">
                    <div
                        className={`text-xl cursor-pointer select-none font-semibold`}
                        role="button"
                        onClick={openDialog}
                    >
                        <FaEye />
                    </div>
                </Tooltip>
            ) : (
                <>
                    <Tooltip title="Edit">
                        <div
                            className={`text-xl cursor-pointer select-none font-semibold`}
                            role="button"
                            onClick={onEdit}
                        >
                            <TbPencil />
                        </div>
                    </Tooltip>
                    {data.comment && data.comment !== '' && (
                        <Tooltip title={data.comment} placement="top-start">
                            <div
                                className={`text-xl cursor-pointer select-none font-semibold`}
                                role="button"
                            >
                                <RiMessage2Fill />
                            </div>
                        </Tooltip>
                    )}
                </>
            )}

            <Dialog
                isOpen={isModalOpen}
                onClose={(e: any) => {
                    onDialogClose(e)
                }}
                onRequestClose={(e: any) => onDialogClose(e)}
            >
                <h5 className="text-2xl mb-4">{data.status} Leave</h5>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Leave Type:</p>
                        <h5>{data.leaveTypeData.leave_name}</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Leave From:</p>
                        <h5>{formatDate(data.leaveFrom)}</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Leave To:</p>
                        <h5>{formatDate(data.leaveTo)}</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Return Date:</p>
                        <h5>{formatDate(data.leaveReturn)}</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Reason:</p>
                        <h5>{data?.reason}</h5>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-3">
                    <div className="flex justify-start w-full gap-3 items-center">
                        <p>Comment:</p>
                        <h5>{data?.comment}</h5>
                    </div>
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={(e: any) => onDialogClose(e)}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={(e: any) => onDialogOk(e)}>
                        Okay
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}

const LeaveListTable = () => {
    const navigate = useNavigate()

    const {
        leaveList,
        leaveListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllLeave,
        setSelectedLeave,
        selectedLeave,
    } = useLeaveList()

    const handleEdit = (leave: Leave) => {
        navigate(`/personal/leave-edit/${leave._id}`)
    }

    const columns: ColumnDef<Leave>[] = useMemo(
        () => [
            {
                header: 'Leave Type',
                id: 'leaveTypeData.leave_name',
                cell: (props) => (
                    <span>
                        {props.row.original.leaveTypeData?.leave_name || ''}
                    </span>
                ),
            },
            {
                header: 'Leave From',
                accessorKey: 'leaveFrom',
            },
            {
                header: 'Leave To',
                accessorKey: 'leaveTo',
            },
            {
                header: 'Reason',
                accessorKey: 'reason',
            },
            {
                header: 'Return Date',
                accessorKey: 'leaveReturn',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status]}>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <>
                        <ActionColumn
                            data={props.row.original}
                            onEdit={() => handleEdit(props.row.original)}
                        />
                    </>
                ),
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedLeave.length > 0) {
            setSelectAllLeave([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        handleSetTableData(newTableData)
    }

    const handleSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        handleSetTableData(newTableData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        handleSetTableData(newTableData)
    }

    const handleRowSelect = (checked: boolean, row: Leave) => {
        setSelectedLeave(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Leave>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLeave(originalRows)
        } else {
            setSelectAllLeave([])
        }
    }

    return (
        <LeaveDataTable
            selectable
            columns={columns}
            data={leaveList}
            noData={!isLoading && leaveList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: leaveListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedLeave.some((selected) => selected._id === row._id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default LeaveListTable
