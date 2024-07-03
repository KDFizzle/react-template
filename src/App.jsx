import {Separator} from "./components/ui/separator.jsx"
import ExpensesTable from "./ExpensesTable.jsx"

function App() {
    return (
        <div className={'m-10'}>
            <h1 className={'text-4xl mb-3 ml-3'}>Expenses</h1>
            <Separator className={'bg-black mb-5'}/>
            <ExpensesTable/>
        </div>
    )
}

export default App
