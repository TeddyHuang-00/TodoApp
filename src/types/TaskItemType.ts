interface TaskItemType {
    uuid: string;
    title: string;
    description: string;
    completed: boolean;
    favorite: boolean;
    pinned: boolean;
    tags?: string[];
}

export default TaskItemType;