import * as React from "react";
import { channels, datas, labelsMap, Idata } from "./data";
import { DragDropContext, Droppable, Draggable, DropResult, NotDraggingStyle, DraggingStyle } from "react-beautiful-dnd";
import classnames from "classnames";
import { Badge } from "reactstrap";
interface IdataConvered {
    id: number,
    name: string,
    child: Idata[]
}



const tasksConvered: IdataConvered[] = channels.map((channel, index) => {
    return {
        id: index,
        name: channel,
        child: datas.filter(it => it.status === channel)
    }
})

const getItemStyle = (isDragging: boolean, draggableStyle: NotDraggingStyle | DraggingStyle | undefined): React.CSSProperties => ({
    userSelect: 'none',
    padding: 8 * 2,
    margin: `0 0 8px 0`,
    background: isDragging ? 'lightblue' : '#f1f1f1',
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
    background: isDraggingOver ? '#ffb6c170' : 'lightgray',
    flex: 1,
    // textAlign: "center"
});

const ListFriend: React.FC<any> = () => {
    const [tasks, setTaskStatus] = React.useState<IdataConvered[]>(tasksConvered);
    
    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        if (source.droppableId === destination.droppableId) {
            let groupDestination = tasks.find(it => `${it.name}` === destination.droppableId) as IdataConvered;
            let item = groupDestination.child.find(it => `${it._id}` === draggableId) as Idata;
            groupDestination.child.splice(source.index, 1);
            groupDestination.child.splice(destination.index, 0, item);
        } else {
            let groupSource = tasks.find(it => `${it.name}` === source.droppableId) as IdataConvered;
            let groupDestination = tasks.find(it => `${it.name}` === destination.droppableId) as IdataConvered;
            let item = groupSource.child.find(it => `${it._id}` === draggableId) as Idata;
            item["status"] = destination.droppableId
            groupSource.child.splice(source.index, 1);
            groupDestination.child.splice(destination.index, 0, item);
        }
        setTaskStatus(tasks)
    }

    return <main>
        <div className="container-fluid mt-3">
            <div className="row">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    {tasks.map((task, index) =>
                        <Droppable droppableId={task.name} key={`channel_${index}`}>
                            {(provided, snapshot) =>
                                <div
                                    className={classnames({ "mx-2": index > 0 && index < tasks.length - 1, "mr-2 ": index === 0, "ml-2": index === tasks.length - 1 })}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    ref={provided.innerRef}>
                                    <div style={{ padding: "10px 8px", background: "lightgray", fontWeight: 500, fontSize: 20 }}>{labelsMap[task.name]}</div>
                                    {task.child.map((child, index) =>
                                        <Draggable
                                            draggableId={`${child._id}`}
                                            index={index}
                                            key={`${child._id}`}>
                                            {(provided, snapshot) =>
                                                <div className="px-2">
                                                    <div
                                                        onClick={() => console.log("aaa")}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                                        ref={provided.innerRef}>
                                                        <div>{child.title}</div>
                                                        <div><Badge color="primary">{labelsMap[child.status]}</Badge></div>
                                                    </div>
                                                </div>}
                                        </Draggable>)}
                                    {provided.placeholder}
                                </div>}
                        </Droppable>)}
                </DragDropContext>
            </div>
        </div>
    </main>
}


export default ListFriend