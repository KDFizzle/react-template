import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./components/ui/table.jsx"
import useExpenses from "./hooks/Expenses.jsx"
import {formatDate} from "./utils/formatter.js"
import {useMemo, useState} from "react"

export default function ExpensesTable() {
    const [data, loading, error] = useExpenses()
    //improvement: use a proper table library like tanstack table
    const [filterOptions, setFilterOptions] = useState(
        {
            merchant: '',
            amount: '',
            category: '',
            description: '',
            status: '',
        }
    )
    // improvement: sort data, filter by range, filter with predefined categories for specific columns, auto complete where possible
    const filteredData = useMemo(() => {
        return data.filter((expense) => {
            for (const filterKey in filterOptions) {
                if (filterOptions[filterKey] === '') continue
                // if any filter options don't match, then remove from list
                if (!expense[filterKey].toString().toLowerCase().includes(filterOptions[filterKey].toLowerCase())) {
                    return false
                }
            }
            return true
        })
    }, [filterOptions, data])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>
                        <div className={'flex flex-col w-fit'}>
                            Merchant
                            <input
                                type="text"
                                value={filterOptions.merchant}
                                placeholder={'Filter'}
                                onChange={(e) => setFilterOptions({...filterOptions, merchant: e.target.value})}/>
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className={'flex flex-col w-fit'}>
                            Amount
                            <input
                                type="text"
                                value={filterOptions.amount}
                                placeholder={'Filter'}
                                onChange={(e) => setFilterOptions({...filterOptions, amount: e.target.value})}/>
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className={'flex flex-col w-fit'}>
                            Category
                            <input
                                type="text"
                                value={filterOptions.category}
                                placeholder={'Filter'}
                                onChange={(e) => setFilterOptions({...filterOptions, category: e.target.value})}/>
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className={'flex flex-col w-fit'}>
                            Description
                            <input
                                type="text"
                                value={filterOptions.description}
                                placeholder={'Filter'}
                                onChange={(e) => setFilterOptions({...filterOptions, description: e.target.value})}/>
                        </div>
                    </TableHead>
                    <TableHead>
                        <div className={'flex flex-col w-fit'}>
                            Status
                            <input
                                type="text"
                                value={filterOptions.status}
                                placeholder={'Filter'}
                                onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}/>
                        </div>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredData.map((expense) => (
                    <TableRow key={expense.id}>
                        <TableCell>{formatDate(expense.date)}</TableCell>
                        <TableCell>{expense.merchant}</TableCell>
                        <TableCell>£{expense.amount}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>)
}