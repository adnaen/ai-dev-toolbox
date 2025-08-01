import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleX, Pen } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { TaskPriority } from "@/types/shared";
import EditTaskFrom from "../forms/TaskEditForm";
import { TaskCrud } from "@/services/task.service";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";

type Props = {
	id: string,
	name: string,
	descreption?: string,
	priority: TaskPriority,
	handleTaskEdit: () => void;
}

const TaskDisplayCard = (props: Props) => {
	const [isCompleted, setIsCompleted] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const [deleteStatus, setDeleteStatus] = useState<string | null>(null)


	useEffect(() => {
		if (isCompleted) {
			setDeleteStatus("this will delete in 5s")
			const timerId = setTimeout(async () => {
				await TaskCrud.deleteTask(props.id)
				console.log("after delete call")
				setDeleteStatus(null)
				props.handleTaskEdit()
			}, 5000)
			return () => {
				clearTimeout(timerId)

			}
		}
		setDeleteStatus(null)
		props.handleTaskEdit()
	}, [isCompleted])


	return (
		<div className={`flex justify-between items-center min-w-50 max-w-96 border p-5 rounded-lg ${isCompleted && 'opacity-40 line-through'} ${props.priority === 'high'
			? 'bg-red-600/10 border-red-300'
			: props.priority === "medium"
				? 'bg-yellow-600/10 border-yellow-300'
				: 'bg-gray-200/10 border-white'
			}`} >
			{!isEditing ? (
				<div>
					<h1 className="text-lg font-bold">{props.name}</h1>
					<p className="text-md text-gray-400">{props.descreption}</p>
					<p className="text-md">Priority:
						<span className={`${props.priority == 'high'
							? 'text-red-600'
							: props.priority == 'medium'
								? 'text-yellow-600'
								: 'text-yellow-100'
							} font-semibold`}> {props.priority}</span></p>
					{deleteStatus && (
						<span className="no-underline">{deleteStatus}</span>
					)}
				</div>
			) : (
				<EditTaskFrom key={props.id} id={props.id} onEdit={props.handleTaskEdit} name={props.name} description={props.descreption} priority={props.priority} />
			)
			}
			<div className="flex flex-col gap-2">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="icon" onClick={() => { setIsCompleted(!isCompleted) }}>
							{!isCompleted
								? <CircleCheck />
								: <CircleX />
							}
						</Button>
					</TooltipTrigger>
					<TooltipContent><p>Completed</p></TooltipContent>
				</Tooltip>

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="icon" onClick={() => { setIsEditing(!isEditing) }}>
							{!isEditing
								? <Pen size={10} />
								: <CircleX />
							}
						</Button>
					</TooltipTrigger>
					<TooltipContent><p>Edit</p></TooltipContent>
				</Tooltip>
			</div>
		</div >
	)
}

export default TaskDisplayCard;
