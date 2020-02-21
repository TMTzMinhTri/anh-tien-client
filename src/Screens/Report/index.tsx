import * as React from 'react'
import { LayoutContext } from '../Layout/LayoutContext'
import Select from 'react-select';

export const ReportScreen = () => {
    const { listUser } = React.useContext(LayoutContext)
    const data = listUser.map(user => {
        return {
            value: user.id,
            label: user.name
        }
    })
    return <div>
        <div>
            <Select
                defaultValue={data[0]}
                options={data}
                onChange={item => console.log(item)}
            />
        </div>
    </div>
}